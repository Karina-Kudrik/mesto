const validationObject = {
   formSelector: '.popup__form-admin',
   inputSelector: '.popup__input',
   inactiveButtonClass: 'popup__button_type_disabled',
   submitButtonSelector: '.popup__button_type_submit',
   inputErrorClass: '.popup__input_type_error',
   errorClass: 'popup__error_active'
}

const showInputError = (formElement, inputElement, validationMessage, {inputErrorClass, errorClass}) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.add(inputErrorClass);
   errorElement.textContent = validationMessage;
   errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.remove(inputErrorClass);
   errorElement.classList.remove(errorClass);
   errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
   if (!inputElement.validity.valid) {
   showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
   } else {
   hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
   }
};

const hasInvalidInput = (inputList) =>{
   return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
   })
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
   const buttonElement = formElement.querySelector(submitButtonSelector);
   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         checkInputValidity(formElement, inputElement, rest);
         toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
   });
};


function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
   if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
   } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
   }
}

const enableValidation = ({formSelector, ...rest}) => {
   const formList = Array.from(document.querySelectorAll(formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      })
   setEventListeners(formElement, rest);
   })
}

enableValidation(validationObject);