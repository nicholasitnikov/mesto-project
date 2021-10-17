const showErrorElement = (form, formInput, options) => {
    const inputError = form.querySelector(`${options.inputErrorClass}-${formInput.id}`);
    inputError.textContent = formInput.validationMessage;
    inputError.classList.add(options.errorClass);
}

const hideErrorElement = (form, formInput, options) => {
    const inputError = form.querySelector(`${options.inputErrorClass}-${formInput.id}`);
    inputError.textContent = formInput.validationMessage;
    inputError.classList.remove(options.errorClass);
}

const disableSubmit = (form, options) => {
    const submit = form.querySelector(options.submitButtonSelector);
    submit.setAttribute('disabled', true);
}

const enableSubmit = (form, options) => {
    const submit = form.querySelector(options.submitButtonSelector);
    submit.removeAttribute('disabled');
}

const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

const isValid = (form, formInput, options) => {
    if(formInput.validity.valid || formInput.value === '') {
        hideErrorElement(form, formInput, options);
    } else {
        showErrorElement(form, formInput, options);
    }
}

const updateSubmit = (form, formInputs, options) => {
    if(hasInvalidInput(formInputs)) {
        disableSubmit(form, options);
    } else {
        enableSubmit(form, options);
    }
}

const checkIsEmpty = (input) => {
    if(input.value === '') {
        input.classList.add('popup__field_empty');
    }
}

const setInputsEventListeners = (form, options) => {

    const formInputs = form.querySelectorAll(options.inputSelector);
    formInputs.forEach(input => {
        checkIsEmpty(input);
        input.addEventListener('input', () => {
            isValid(form, input, options);
            updateSubmit(form, formInputs, options);
        });

    });

}

const setEventListeners = (form, options) => {
    setInputsEventListeners(form, options);
}

export const enableValidation = (options) => {

    const forms = document.querySelectorAll(options.formSelector);
    forms.forEach(form => {
        setEventListeners(form, options);
    })
    
}