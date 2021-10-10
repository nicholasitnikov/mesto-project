import './index.css';
import { initialCards } from '../components/initialCards.js';
import { enableValidation } from '../components/validate.js';
import { createPlace, renderPlace } from '../components/card.js';
import { openPopupEditUser, closePopupEditUser, buttonEdit, buttonCloseEditUserPopup, formEditUser, updateUser } from '../components/modalEditUser.js';
import { buttonPlaceAddition, buttonClosePlaceAdditionPopup, formPlaceAddition, openPopupAdditionPlace, closePopupAdditionPlace, submitAdditionForm } from '../components/modalAddPlace.js';
import { buttonCloseImagePopup, closePopupImage } from '../components/modalImage.js';
import { modals, closePopup } from '../components/modal.js';


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
    formSelector: '.form_type_addplace',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__field-error',
    errorClass: 'popup__field-error_visible',
    disableAfterSubmit: true
}); 

// Добавление элементов по-умолчанию

initialCards.forEach((card, index) => {
    renderPlace(createPlace(card.name, card.link), false);
})

// Добавление обработчиков

buttonEdit.addEventListener('click', openPopupEditUser);
buttonCloseEditUserPopup.addEventListener('click', closePopupEditUser);

formEditUser.addEventListener('submit', (e) => {
    e.preventDefault();
    updateUser();
    closePopupEditUser();
})

buttonPlaceAddition.addEventListener('click', openPopupAdditionPlace);

buttonClosePlaceAdditionPopup.addEventListener('click', closePopupAdditionPlace);

formPlaceAddition.addEventListener('submit', (e) => {
    e.preventDefault();
    submitAdditionForm();
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