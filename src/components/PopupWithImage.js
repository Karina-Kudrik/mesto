import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      this._popupImg = this._popup.querySelector('.popup__image');
      this._popupCaption = this._popup.querySelector('.popup__caption');
   }

   open(name, link) {
      this._popupImg.src = link;
      this._popupImg.alt = name;
      this._popupCaption.textContent = name;
      super.open();
   }
}