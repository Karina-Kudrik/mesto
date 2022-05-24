export default class Card {
   constructor({ id, name, link, likes, ownerId, userId},
   cardSelector,
   handleCardClick, 
   handleDeleteClick, 
   handleLikeClick) {
   this._id = id;
   this._name = name;
   this._link = link;
   this._likes = likes;
   this._ownerId = ownerId;
   this._userId = userId;
   this._cardSelector = cardSelector;
   this._handleCardClick = handleCardClick;
   this._handleDeleteClick = handleDeleteClick;
   this._handleLikeClick = handleLikeClick
   }
   _getTemplate() {
      return document
         .querySelector(this._cardSelector)
         .content
         .querySelector('.elements__card')
         .cloneNode(true);
   }
   _handleLikeCard() {
      this._cardLikeBtn.classList.toggle('elements__like_active');
   }
   _handleCardRemove() {
      this._element.remove();
      this._element = null;
   }

   _setEventListeners() {
      this._cardLikeBtn.addEventListener('click', () => {
         this._handleLikeCard();
      });
      this._cardDeleteBtn.addEventListener('click', () => {
         this._handleCardRemove();
      });
      this._cardImage.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   }

   generateCard() {
      this._element = this._getTemplate();
      this._cardLikeBtn = this._element.querySelector('.elements__like');
      this._cardDeleteBtn = this._element.querySelector('.elements__delete');
      this._cardImage = this._element.querySelector('.elements__item');
      this._element.querySelector('.elements__card-heading').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._setEventListeners();

      return this._element;
   }
}
