import "core-js/stable";
import "regenerator-runtime/runtime";

import './index.css';
import { enableValidation } from '../components/validate.js';
import { createPlace, handleAddCard, renderPlace } from '../components/card.js';
import { popupEditUser, openPopupEditUser, closePopupEditUser, buttonEdit, buttonCloseEditUserPopup, formEditUser } from '../components/modalEditUser.js';
import { buttonPlaceAddition, buttonClosePlaceAdditionPopup, formPlaceAddition, openPopupAdditionPlace, closePopupAdditionPlace, popupPlaceAddition } from '../components/modalAddPlace.js';
import { buttonCloseImagePopup, closePopupImage } from '../components/modalImage.js';
import { modals, closePopup, updateSubmitText } from '../components/modal.js';
import { loadCurrentProfile, profileAvatar, handleAvatarEdit, handleUpdateAvatar, handleUpdateProfile } from '../components/profile.js';
import { getCards } from '../components/api.js';
import { buttonPlaceRemove, handleRemovePlaceButton } from '../components/modalRemovePlace.js';
import { closePopupEditAvatar, formEditAvatar, popupEditAvatar } from "../components/modalEditAvatar.js";

// Загрузка пользователя

loadCurrentProfile();

// Включение валидации

enableValidation({
    formSelector: '.form_type_useredit',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__field-error',
    errorClass: 'popup__field-error_visible',
    disableAfterSubmit: false
}); 

enableValidation({
    formSelector: '.form_type_editavatar',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__field-error',
    errorClass: 'popup__field-error_visible',
    disableAfterSubmit: true
}); 

enableValidation({
    formSelector: '.form_type_addplace',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__field-error',
    errorClass: 'popup__field-error_visible',
    disableAfterSubmit: true
}); 

// Загрузка карточек

getCards().then(cards => {
   cards.forEach(card => {
    renderPlace(createPlace(card), false);
   })
})

// Добавление обработчиков

buttonEdit.addEventListener('click', openPopupEditUser);
buttonCloseEditUserPopup.addEventListener('click', closePopupEditUser);

formEditUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateSubmitText(popupEditUser, 'Сохранение...');
    await handleUpdateProfile();
    updateSubmitText(popupEditUser, 'Сохранить');
    closePopupEditUser();
})

buttonPlaceAddition.addEventListener('click', openPopupAdditionPlace);

buttonClosePlaceAdditionPopup.addEventListener('click', closePopupAdditionPlace);

formPlaceAddition.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateSubmitText(popupPlaceAddition, 'Создание...');
    await handleAddCard();
    updateSubmitText(popupPlaceAddition, 'Создать');
    closePopupAdditionPlace();
})

buttonCloseImagePopup.addEventListener('click', closePopupImage);

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
    await handleUpdateAvatar(e.target.elements.link.value);
    updateSubmitText(popupEditAvatar, 'Сохранить');
    closePopupEditAvatar();
})