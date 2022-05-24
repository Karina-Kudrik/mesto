import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
   constructor(popupSelector, {handleFormSubmit}) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form-admin');
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._handleFormSubmit = handleFormSubmit;
   }

   _getInputValues() {
      this._inputValues = {};
      this._inputList.forEach(input=> {
         this._inputValues[input.name] = input.value;
      });

      return this._inputValues;
   }

   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._handleFormSubmit(this._getInputValues());
         this.close();
      });
   }

   close() {
      this._form.reset();
      super.close();
   }
}