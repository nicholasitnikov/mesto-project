import { openPopup, closePopup } from "./modal.js";
export const buttonEdit = document.querySelector('.profile__edit');
export const popupEditUser = document.querySelector('.popup_role_edit');

export const profileName = document.querySelector('.profile__heading');
export const profileDescription = document.querySelector('.profile__description');
export const fieldNameProfile = popupEditUser.querySelector('.popup__field_name_username');
export const fieldDescriptionProfile = popupEditUser.querySelector('.popup__field_name_description');
export const formEditUser = popupEditUser.querySelector('.form_type_useredit');
export const buttonCloseEditUserPopup = popupEditUser.querySelector('.popup__close');

export const openPopupEditUser = () => {
    fieldNameProfile.value = profileName.textContent;
    fieldDescriptionProfile.value = profileDescription.textContent;
    openPopup(popupEditUser);
} 

export const closePopupEditUser = () => {
    closePopup(popupEditUser);
}

export const updateUser = () => {
    profileName.textContent = fieldNameProfile.value;
    profileDescription.textContent = fieldDescriptionProfile.value;
}