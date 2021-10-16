import { openPopup, closePopup } from "./modal.js";
import { removeCard } from "./api.js";
import { removePlaceElement } from "./card.js";

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
    const removedCard = await removeCard(cardId);
    closePopupRemovePlace();
    if(removedCard) {
        removePlaceElement(cardId);
    }
}