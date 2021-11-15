import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor({ selector, submitHandler, validator, initialValuesSelectors, inputSelector }) {
        super({ selector });
        this._submitHandler = submitHandler;
        this._validator = validator;
        this._form = this._element.querySelector('.form');
        this._inputSelector = inputSelector;
        this._initialValuesSelectors = initialValuesSelectors;
        this._submitButton = this._form.querySelector('.popup__button');
    }

    _setInitialValues() {
        Object.keys(this._initialValuesSelectors).forEach(key => {
            const input = document.querySelector(`${this._inputSelector}[name="${key}"]`);
            input.value = document.querySelector(this._initialValuesSelectors[key]).textContent;
        })
        this._validator.updateSubmit();
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
        this._form.addEventListener('submit', (e) => this._submitForm(e));
    }
    open() {
        super.open();
        if(this._initialValuesSelectors) {
            this._setInitialValues();
        }
    }
    close() {
        super.close();
        this._validator.resetValidation();
    }
    updateSubmitText(text) {
        this._submitButton.textContent = text;
    }
}