import "core-js/stable";
import "regenerator-runtime/runtime";

import './index.css';
import { enableValidation } from '../components/validate.js';
import { createPlace, handleAddCard, renderPlace } from '../components/card.js';
import { popupEditUser, openPopupEditUser, closePopupEditUser, buttonEdit, formEditUser } from '../components/modalEditUser.js';
import { buttonPlaceAddition, formPlaceAddition, closePopupAdditionPlace, openPopupAdditionPlace, popupPlaceAddition } from '../components/modalAddPlace.js';
import { modals, closePopup, updateSubmitText } from '../components/modal.js';
import { loadCurrentProfile, profileAvatar, handleAvatarEdit, handleUpdateAvatar, handleUpdateProfile } from '../components/profile.js';
import { getCards } from '../components/api.js';
import { buttonPlaceRemove, handleRemovePlaceButton } from '../components/modalRemovePlace.js';
import { formEditAvatar, popupEditAvatar, closePopupEditAvatar } from "../components/modalEditAvatar.js";

// Включение валидации

enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__field-error',
    errorClass: 'popup__field-error_visible'
});

// Загрузка карточек и данных пользователя

Promise.all([getCards(), loadCurrentProfile()]).then(([cards, _]) => {
    cards.forEach(card => {
     renderPlace(createPlace(card), false);
    })
 }).catch(err => {
     console.log(err);
 })


// Добавление обработчиков

buttonEdit.addEventListener('click', openPopupEditUser);

formEditUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateSubmitText(popupEditUser, 'Сохранение...');
    await handleUpdateProfile().then(res => {
        updateSubmitText(popupEditUser, 'Сохранить');
        closePopupEditUser();
    }).catch(err => {
        console.log(err);
        updateSubmitText(popupEditUser, 'Ошибка');
    })
})

buttonPlaceAddition.addEventListener('click', openPopupAdditionPlace);

formPlaceAddition.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateSubmitText(popupPlaceAddition, 'Создание...');
    handleAddCard().then(res => {
        updateSubmitText(popupPlaceAddition, 'Создать');
        closePopupAdditionPlace();
    }).catch(err => {
        console.log(err);
        updateSubmitText(popupPlaceAddition, 'Ошибка');
    })
})

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(Array.from(e.target.classList).includes('popup')) {
            closePopup(modal);
        }
    })
})

buttonPlaceRemove.addEventListener('click', handleRemovePlaceButton);

profileAvatar.addEventListener('click', handleAvatarEdit)

formEditAvatar.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateSubmitText(popupEditAvatar, 'Сохранение...');
    await handleUpdateAvatar(e.target.elements.link.value).then(res => {
        updateSubmitText(popupEditAvatar, 'Сохранить');
        closePopupEditAvatar();
    }).catch(err => {
        updateSubmitText(popupEditAvatar, 'Ошибка');
        console.log(err);
    })
})

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})