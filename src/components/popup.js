export default class Popup {
    constructor({ selector }) {
        this._element = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    open() {
        this._element.classList.add('popup_opened');
    }
    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._element.classList.remove('popup_opened');
    }
    _handleEscClose(e) {
        if(e.key === 'Escape') {
            e.preventDefault();
            this.close();
        }
    }
    setEventListeners() {
        this._removeButton = this._element.querySelector('.popup__close');
        this._removeButton.addEventListener('click', () => this.close());
        document.addEventListener('keydown', this._handleEscClose);
        this._element.addEventListener('click', (e) => {
            if(Array.from(e.target.classList).includes('popup')) {
                this.close();
            }
        })
    }
}