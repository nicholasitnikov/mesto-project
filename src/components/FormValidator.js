import { constants } from "../utils/constants";

export default class FormValidator {
    constructor (options, formElement) {
        this._form = formElement;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
        this._formInputs = this._form.querySelectorAll(this._inputSelector);
    }     

    _showErrorElement(formInput) {
        const inputError = this._form.querySelector(`${this._inputErrorClass}-${formInput.id}`);
        inputError.textContent = formInput.validationMessage;
        inputError.classList.add(this._errorClass);
    }

    _hideErrorElement(formInput) {
        const inputError = this._form.querySelector(`${this._inputErrorClass}-${formInput.id}`);
        inputError.textContent = formInput.validationMessage;
        inputError.classList.remove(this._errorClass);
    }

    _disableSubmit() {
        this._submitButton.setAttribute('disabled', true);
    }

    _enableSubmit() {
        this._submitButton.removeAttribute('disabled');
    }

    _hasInvalidInput(inputList) {
        return Array.from(inputList).some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };
    
    _isValid = (formInput) => {
        if(formInput.validity.valid || formInput.value === '') {
            this._hideErrorElement(formInput);
        } else {
            this._showErrorElement(formInput);
        }
    }

    updateSubmit () {
        if(this._hasInvalidInput(this._formInputs)) {
            this._disableSubmit();
        } else {
            this._enableSubmit();
        }
    }

    _checkIsEmpty(input) {
        if(input.value === '') {
            input.classList.add(constants.validation.fieldEpmty);
        }
    }
   
    _setEventListeners() {
        this._formInputs.forEach(input => {
            this._checkIsEmpty(input);
            input.addEventListener('input', () => {
                this._isValid(input);
                this.updateSubmit(this._formInputs);
            });    
        });
    }

    resetValidation() {
        this._form.reset();
        this._formInputs.forEach(input => {
            this._checkIsEmpty(input);  
            this._hideErrorElement(input) 
        });
        this._disableSubmit();
    }

    enableValidation() {
        this._setEventListeners();    
    }
}