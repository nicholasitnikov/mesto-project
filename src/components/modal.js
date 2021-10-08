export const modals = document.querySelectorAll('.popup');

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}
