export const modals = document.querySelectorAll('.popup');

const handlePopupExit = (e, popup) => {
    console.log('hello')
    if(e.code === 'Escape') {
        e.preventDefault();
        closePopup(popup);
    }
}

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => handlePopupExit(e, popup), { once: true });
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}