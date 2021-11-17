import { constants } from "../utils/constants";
export default class Popup {
    constructor({ selector }) {
        this._element = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    open() {
        this._element.classList.add(constants.popupStateSelector.popupActive);
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._element.classList.remove(constants.popupStateSelector.popupActive);
    }
    _handleEscClose(e) {
        if(e.key === 'Escape') {
            e.preventDefault();
            this.close();
        }
    }
    setEventListeners() {
        this._removeButton = this._element.querySelector(constants.popupStateSelector.popupClose);
        this._removeButton.addEventListener('click', () => this.close());        
        this._element.addEventListener('click', (e) => {
            if(Array.from(e.target.classList).includes(constants.popupSelector.popup)) {
                this.close();
            }
        })
    }
}