export class Card {
   constructor(data, cardSelector, previewCardImg) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._previewCardImg = previewCardImg;
   }

   _getTemplate() {
   const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true)
      return cardElement;
   }

   _handleLikeCard() {
      this._element.querySelector('.elements__like').classList.toggle("elements__like_active");
   }
   _handleCardRemove() {
      this._element.remove();
   }
   
   _setEventListeners() {
      this._element.querySelector(".elements__like").addEventListener('click', () => {
         this._handleLikeCard();
      });
      this._element.querySelector(".elements__delete").addEventListener('click', () => {
         this._handleCardRemove();
      });
      this._element.querySelector(".elements__item").addEventListener('click', () => {
         this._previewCardImg();
      });
   }

   generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.elements__card-heading').textContent = this._name;
      this._element.querySelector('.elements__item').src = this._link;
      this._element.querySelector('.elements__item').alt = this._name;

      return this._element;
   }
}