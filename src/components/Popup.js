export default class Popup {
   constructor(popupSelector){
      this._popup = popupSelector
   }

   open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleCloseOnEsc);
   }

   close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('kyedown', this._handleCloseOnEsc);
   }

   _handleCloseOnEsc = (evt) => {
      if (evt.key === 'Escape') {
         this.close();
      }
   }

   _handleClosePopupOnOverlay(evt) {
      if(evt.target === evt.currentTarget) {
         this.close();
      }
   }

   setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
         if ((evt.target.classList.contains('popup__button_type_close')) || (evt.target.classList.contains('popup_opened'))){
            this.close();
         }
      });
   }
}