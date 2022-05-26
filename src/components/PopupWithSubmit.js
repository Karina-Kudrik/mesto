import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
   constructor (popupSelector, handleFormSubmit) {
      super (popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._submitButton = this._popup.querySelector('.popup__button_type_submit');
   }

open(cardId, card) {
   super.open();
   this._cardId = cardId;
   this._card = card;
}

setEventListeners() {
   super.setEventListeners();
   this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._card, this,_cardId);
   });
}
}   