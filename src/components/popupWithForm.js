import Popup from './popup.js';
export default class PopupWithForm extends Popup {
    constructor({ selector, submitHandler }) {
        super({ selector });
        this._submitHandler = submitHandler;
    }
    _getInputValues() {
        return Array.from(this._form.elements).reduce((res, current) => {
            if(current.value === '') { return res; }
            res[current.name] = current.value
            return res;
        }, {})
    }
    _submitForm(e) {
        e.preventDefault();
        const values = this._getInputValues();
        this._submitHandler(values);
    }
    setEventListeners() {
        super.setEventListeners();
        this._form = this._element.querySelector('.form');
        this._form.addEventListener('submit', (e) => this._submitForm(e));
    }
    close() {
        super.close();

    }
    updateSubmitText(text) {
        this._submitButton = this._form.querySelector('.popup__button');
        this._submitButton.textContent = text;
    }
}