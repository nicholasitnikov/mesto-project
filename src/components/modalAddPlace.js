import { openPopup, closePopup } from "./modal.js";

export const popupPlaceAddition = document.querySelector('.popup_role_add');
export const formPlaceAddition = popupPlaceAddition.querySelector('.form_type_addplace');
export const buttonPlaceAddition = document.querySelector('.profile__add-place');

export const openPopupAdditionPlace = () => {
    formPlaceAddition.reset();
    openPopup(popupPlaceAddition);
} 

export const closePopupAdditionPlace = () => {
    closePopup(popupPlaceAddition);
}