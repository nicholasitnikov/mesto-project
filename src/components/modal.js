export const modals = document.querySelectorAll('.popup');

const escHandler = (e, popup) => {
    if(e.code === 'Escape') {
        e.preventDefault();
        closePopup(popup);
    }
}

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => escHandler(e, popup));
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => escHandler(e, popup));
}