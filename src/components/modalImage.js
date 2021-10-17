import { openPopup } from "./modal.js";

export const popupImage = document.querySelector('.popup_role_image');

export const openPopupImage = (name, link) => {

    openPopup(popupImage);
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__caption').textContent = name;

}