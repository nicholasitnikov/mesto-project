import { openPopup, closePopup } from "./modal.js";
// import { removePlaceElement } from "./card.js";
import { api } from './api.js';

export const popupPlaceRemove = document.querySelector('.popup_role_remove');
export const buttonClosePlaceRemovePopup = popupPlaceRemove.querySelector('.popup__close');
export const buttonPlaceRemove = popupPlaceRemove.querySelector('.popup__button');

export const openPopupRemovePlace = (id) => {
    openPopup(popupPlaceRemove);
    buttonPlaceRemove.setAttribute('data-id', id);
} 

export const closePopupRemovePlace = () => {
    closePopup(popupPlaceRemove);
}

export const handleRemovePlaceButton = async (e) => {
    const cardId = e.target.getAttribute('data-id');
    try {
        const removedCard = await api.removeCard(cardId);
        if(removedCard) {
            // removePlaceElement(cardId);
        }
    } catch (err) {
        console.log(err);
    } finally {
        closePopupRemovePlace();
    }
}