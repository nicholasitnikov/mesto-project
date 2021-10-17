export const modals = document.querySelectorAll('.popup');

const handlePopupExit = (e) => {
    if(e.code === 'Escape') {
        e.preventDefault();
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

export const openPopup = (popup) => {

    const form = popup.querySelector('.form');

    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupExit);

    if(!form) return;

    const formHasValues = Array.from(form.elements).some(el => el.value !== '');
    if(formHasValues) {
        const submit = form.querySelector('.popup__button');
        submit.removeAttribute('disabled');
    }
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlePopupExit);
    const form = popup.querySelector('.form');
    if(!form) return;
    const submit = popup.querySelector('.popup__button');
    form.reset();
    submit.setAttribute('disabled', true);
}

export const updateSubmitText = (popup, text) => {
    const submitButton = popup.querySelector('.popup__button');
    submitButton.textContent = text;
}