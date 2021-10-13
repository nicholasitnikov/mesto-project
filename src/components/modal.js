export const modals = document.querySelectorAll('.popup');

const handlePopupExit = (e) => {
    if(e.code === 'Escape') {
        e.preventDefault();
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupExit);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlePopupExit);
}