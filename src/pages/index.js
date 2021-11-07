import "core-js/stable";
import "regenerator-runtime/runtime";
import './index.css';
import FormValidator from '../components/validate.js';
import Card, { handleAddCard } from '../components/card.js';
import { popupEditUser, openPopupEditUser, closePopupEditUser, buttonEdit, formEditUser } from '../components/modalEditUser.js';
import { buttonPlaceAddition, formPlaceAddition, closePopupAdditionPlace, openPopupAdditionPlace, popupPlaceAddition } from '../components/modalAddPlace.js';
import { modals, closePopup, updateSubmitText } from '../components/modal.js';
import { loadCurrentProfile, profileAvatar, handleAvatarEdit, handleUpdateAvatar, handleUpdateProfile } from '../components/profile.js';
import { buttonPlaceRemove, handleRemovePlaceButton } from '../components/modalRemovePlace.js';
import { formEditAvatar, popupEditAvatar, closePopupEditAvatar } from "../components/modalEditAvatar.js";
import { api } from '../components/api.js';
import Section from '../components/section.js';

// Включение валидации

const validationOptions = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__field-error',
    errorClass: 'popup__field-error_visible'
}

const userEditFormValidator = new FormValidator (validationOptions, document.forms.userEditForm);
const avatarEditFormValidator = new FormValidator (validationOptions, document.forms.editAvatarForm);
const cardEditFormValidator = new FormValidator (validationOptions, document.forms.addPlaceForm);
cardEditFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();
userEditFormValidator.enableValidation();

const cardRenderer= (card, user) => {    
    const newCard = new Card({
        card, 
        user, 
        cardSelector: '#placeTemplate',
        handleRemove: function() {
            // removeItem(card._id);
            console.log(this)
        },
        handleImage: function() {
            console.log(this)
        }                
    });
    const cardElement = newCard.getElement();
    return cardElement;
}

// Загрузка карточек и данных пользователя

Promise.all([api.getInitalCards(), loadCurrentProfile()]).then(([cards, user]) => {
    console.log(user);
    const placesSection = new Section({
        items: cards,
        renderer: (card) => cardRenderer(card, user)
    },'.places')
    placesSection.addAllItems();    
 }).catch(err => {
     console.log(err);
 })


// Добавление обработчиков

buttonEdit.addEventListener('click', openPopupEditUser);

formEditUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateSubmitText(popupEditUser, 'Сохранение...');
    try {
        await handleUpdateProfile();
    } catch (err) {
        console.log(err);
        updateSubmitText(popupEditUser, 'Ошибка');
    } finally {
        updateSubmitText(popupEditUser, 'Сохранить');
        closePopupEditUser();
    }
})

buttonPlaceAddition.addEventListener('click', openPopupAdditionPlace);

formPlaceAddition.addEventListener('submit', async (e) => {
    const fieldNamePlace = popupPlaceAddition.querySelector('.popup__field_name_placename');
    const fieldLinkPlace = popupPlaceAddition.querySelector('.popup__field_name_placelink');
    e.preventDefault();
    updateSubmitText(popupPlaceAddition, 'Создание...');
    api.createCard(fieldNamePlace.value, fieldLinkPlace.value).then(card => {
        const placesSection = new Section({
            items: [card],
            renderer: (card) => cardRenderer(card, card.owner)
        },'.places')
        placesSection.addItem();
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
    try {
        await handleUpdateAvatar(e.target.elements.link.value);
    } catch (err) {
        updateSubmitText(popupEditAvatar, 'Ошибка');
        console.log(err);
    } finally {
        updateSubmitText(popupEditAvatar, 'Сохранить');
        closePopupEditAvatar();
    }
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