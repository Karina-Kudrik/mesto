export default class Card {
   constructor({id, name, link, likes, owner, userId},
   cardSelector,
   handleCardClick, 
   handleDeleteClick, 
   handleLikeClick) {
      this._name = name;
      this._link = link;
      this._likes = likes;
      this._owner = owner;
      this._id = id;
      this._userId = userId;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
   }
   _getTemplate() {
      return document
         .querySelector(this._cardSelector)
         .content
         .querySelector('.elements__card')
         .cloneNode(true);
   }

   toggleLike = (likeCounter) => {
      this._cardLikeBtn.classList.toggle('elements__like_active');
      this._likeCounter.textContent = likeCounter;
   }

   _likeCard = () => {
      this._handleLikeClick(this._id, this.toggleLike, this._isLiked);
      this._isLiked = !this._isLiked;
   }

   _ifIsLiked = () => {
      let result = false;
      this._likes.forEach((like) => {
         if (this._userId === like._id) {
            result = true;
         }
      });
      return result;
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

      if (this._owner._id !== this._userId){
         this._cardDeleteBtn.remove();
      } 

      this._isLiked = this._ifIsLiked();
      if (this._isLiked) {
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
      this._cardLikeBtn.addEventListener('click', this._likeCard);
      this._cardDeleteBtn.addEventListener('click', () => {
         this._handleDeleteClick(this);
      });
      this._cardImage.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   }
}