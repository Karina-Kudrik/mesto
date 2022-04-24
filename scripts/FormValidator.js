export class FormValidator {
   constructor(validationObject, formElement) {
   this._validationObject = validationObject;
   this._formElement = formElement;
   this._inputList = Array.from(this._formElement.querySelectorAll(this._validationObject.inputSelector));
   this._submitButton = this._formElement.querySelector(this._validationObject.submitButtonSelector);
   }

   _showInputError (inputElement, validationMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = validationMessage;
      errorElement.classList.add(this._validationObject.errorClass);
      inputElement.classList.add(this._validationObject.inputErrorClass);
   }

   _hideInputError (inputElement){
      this._inputError = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._inputError.textContent = '';
      inputElement.classList.remove(this._validationObject.inputErrorClass);
   }

   _checkInputValidity (inputElement) {
      if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      } else {
      this._hideInputError(inputElement);
      }
   }

   _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      })
   }

   _disabledSubmitButton() {
      this._submitButton.classList.add(this._validationObject.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
   }

   _activeSubmitButton(){
      this._submitButton.classList.remove(this._validationObject.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
   }

   _toggleButtonState() {
      if (this._hasInvalidInput()) {
      this._disabledSubmitButton();
      } else {
      this._activeSubmitButton();
      }
   }

   _setEventListeners() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
         this._checkInputValidity(inputElement);
         this._toggleButtonState();
         });
      });
   }

   resetValidation() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      });
   }

   enableValidation() {
      this._setEventListeners();
      this._formElement.addEventListener('submit', (evt) =>{
         evt.preventDefault();
      });
   }
}