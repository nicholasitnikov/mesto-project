export default class FormValidator {
    constructor (options, formElement) {
        this._form = formElement;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
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
        const submit = this._form.querySelector(this._submitButtonSelector);
        submit.setAttribute('disabled', true);
    }

    _enableSubmit() {
        const submit = this._form.querySelector(this._submitButtonSelector);
        submit.removeAttribute('disabled');
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

    _updateSubmit (formInputs) {
        if(this._hasInvalidInput(formInputs)) {
            this._disableSubmit();
        } else {
            this._enableSubmit();
        }
    }

    _checkIsEmpty(input) {
        if(input.value === '') {
            input.classList.add('popup__field_empty');
        }
    }
   
    _setEventListeners() {
        const formInputs = this._form.querySelectorAll(this._inputSelector);
        formInputs.forEach(input => {
            this._checkIsEmpty(input);
            input.addEventListener('input', () => {
                this._isValid(input);
                this._updateSubmit(formInputs);
            });    
        });
    
    }

    enableValidation() {
        this._setEventListeners();    
    }
}