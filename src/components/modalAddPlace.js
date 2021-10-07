import { openPopup, closePopup } from "./modal.js";
import { createPlace, renderPlace, removePlace } from './card.js';

export const popupPlaceAddition = document.querySelector('.popup_role_add');
export const fieldNamePlace = popupPlaceAddition.querySelector('.popup__field_name_placename');
export const fieldLinkPlace = popupPlaceAddition.querySelector('.popup__field_name_placelink');
export const formPlaceAddition = popupPlaceAddition.querySelector('.form_type_addplace');
export const buttonClosePlaceAdditionPopup = popupPlaceAddition.querySelector('.popup__close');
export const buttonPlaceAddition = document.querySelector('.profile__add-place');

export const openPopupAdditionPlace = () => {
    popupPlaceAddition.classList.add('popup_opened');
    formPlaceAddition.reset();
    openPopup(popupPlaceAddition);
} 

export const closePopupAdditionPlace = () => {
    closePopup(popupPlaceAddition);
}

export const submitAdditionForm = () => {
    renderPlace(createPlace(fieldNamePlace.value, fieldLinkPlace.value), true);
}