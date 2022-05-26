export default class Card {
   constructor({id, name, link, likes, ownerId, userId},
   cardSelector,
   handleCardClick, 
   handleDeleteClick, 
   handleLikeCard) {
   this._id = id;
   this._name = name;
   this._link = link;
   this._likes = likes;
   this._ownerId = ownerId;
   //this._userId = userId;
   this._cardSelector = cardSelector;
   this._handleCardClick = handleCardClick;
   this._handleDeleteClick = handleDeleteClick;
   this._handleLikeCard = handleLikeCard
   }
   _getTemplate() {
      return document
         .querySelector(this._cardSelector)
         .content
         .querySelector('.elements__card')
         .cloneNode(true);
   }

   generateCard() {
      this._element = this._getTemplate();
      this._cardLikeBtn = this._element.querySelector('.elements__like');
      this._likeCounter = this._element.querySelector('.elements__like-counter');
      this._likeCounter.textContent = this._likes.length;
      this._cardDeleteBtn = this._element.querySelector('.elements__delete');
      this._cardImage = this._element.querySelector('.elements__item');
      this._element.querySelector('.elements__card-heading').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this.hasUserLike = this._likes.some((like) => like._id === this._userId);
      console.log(this._ownerId._id);
      if (this._ownerId._id != 'c12d0cf84adf777a4ee414a7'){
         console.log('не моя');
      this._cardDeleteBtn.remove();
      } else {
         console.log('моя');
      }

      if (this._likes.some((like) => like._id === this._userId)) {
         this._cardLikeBtn.classList.add('elements__like_active');
      }

      this._setEventListeners();

      return this._element;
   }

   handleCardRemove() {
      this._element.remove();
      this._element = null;
   }

   _setEventListeners() {
      this._cardLikeBtn.addEventListener('click', () => {
         this._handleLikeCard(this, this.hasMyLike);
      });
      this._cardDeleteBtn.addEventListener('click', () => {
         //console.log(this._element, this._id);
         this._handleDeleteClick(this._element, this._cardId);
      });
      this._cardImage.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   }

   deleteUserLike(likes) {
      this._cardLikeBtn.classList.remove('elements__like_active');
      this._likeCounter.textContent = likes;
   }

   addUserLike(likes) {
      this._cardLikeBtn.classList.add('elements__like_active');
      this._likeCounter.textContent = likes;
   }
}