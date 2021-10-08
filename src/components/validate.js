// enableValidation({
//     formSelector: '.form_type_useredit',
//     inputSelector: '.popup__field',
//     submitButtonSelector: '.popup__button',
//     inputErrorClass: 'popup__field-error',
//     errorClass: 'popup__input-error_visible'
// }); 

export const enableValidation = (options) => {
    
    const showErrorElement = (form, formInput) => {
        const inputError = form.querySelector(`${options.inputErrorClass}-${formInput.id}`);
        inputError.textContent = formInput.validationMessage;
        inputError.classList.add(options.errorClass);
    }
    
    const hideErrorElement = (form, formInput) => {
        const inputError = form.querySelector(`${options.inputErrorClass}-${formInput.id}`);
        inputError.textContent = formInput.validationMessage;
        inputError.classList.remove(options.errorClass);
    }
    
    const disableSubmit = (form) => {
        const submit = form.querySelector(options.submitButtonSelector);
        submit.setAttribute('disabled', true);
    }
    
    const enableSubmit = (form) => {
        const submit = form.querySelector(options.submitButtonSelector);
        submit.removeAttribute('disabled');
    }
    
    const hasInvalidInput = (inputList) => {
        return Array.from(inputList).some((inputElement) => {
      
          return !inputElement.validity.valid;
        })
      }; 
    
    const isValid = (form, formInput) => {
        if(formInput.validity.valid || formInput.value === '') {
            hideErrorElement(form, formInput);
        } else {
            showErrorElement(form, formInput);
        }
    }
    
    const setEventListeners = (form) => {
    
        const formInputs = form.querySelectorAll(options.inputSelector);
        formInputs.forEach(input => {
    
            input.addEventListener('input', () => {
                isValid(form, input);
                if(hasInvalidInput(formInputs)) {
                    disableSubmit(form);
                } else {
                    enableSubmit(form);
                }
            });
    
        });
    
    }

    const form = document.querySelector(options.formSelector);

    setEventListeners(form);

}