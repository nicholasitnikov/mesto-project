export default class Popup {
    constructor({ selector }) {
        this._element = document.querySelector(selector);
    }
    open() {
        this._element.classList.add('popup_opened');
    }
    close() {
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
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
        this._element.addEventListener('click', (e) => {
            if(Array.from(e.target.classList).includes('popup')) {
                this.close();
            }
        })
    }
}