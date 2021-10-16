import { openPopup, closePopup } from "./modal.js";

export const popupEditAvatar = document.querySelector('.popup_role_edit-avatar');
export const fieldNameProfile = popupEditAvatar.querySelector('.popup__field_name_username');
export const fieldDescriptionProfile = popupEditAvatar.querySelector('.popup__field_name_description');
export const formEditAvatar = popupEditAvatar.querySelector('.form_type_editavatar');
export const buttonCloseEditAvatarPopup = popupEditAvatar.querySelector('.popup__close');

export const openPopupEditAvatar = () => {
    formEditAvatar.reset();
    openPopup(popupEditAvatar);
} 

export const closePopupEditAvatar = () => {
    closePopup(popupEditAvatar);
}