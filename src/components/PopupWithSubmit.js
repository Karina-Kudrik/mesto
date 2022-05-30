import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
   constructor (popupSelector, {handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
   }

   open(card) {
      super.open();
      this._card = card;
   }

   setEventListeners() {
      this._popup.addEventListener('submit', (event) => {
         event.preventDefault();
         this._handleFormSubmit(this._card);
      });
      super.setEventListeners();
   }
} 