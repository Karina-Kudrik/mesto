export default class Api {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
   }

   _handleError(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   getUserInfo() {
      return fetch(this._url + 'users/me', {
         method:'GET',
         headers: this._headers,
      }).then(this._handleError); 
   }

   getInitialCards() {
      return fetch(this._url + 'cards', {
         method:'GET',
         headers: this._headers
      }).then(this._handleError);
   }

   getAllData() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()])
   }

   setUserInfo({name, about}) {
      return fetch(this._url + 'users/me', {
         method:'PATCH',
         headers: this._headers,
         body:JSON.stringify({name, about}),
      }).then(this._handleError); 
   }

   addCard({name, link}) {
      return fetch(this._url + 'cards', {
         method:'POST',
         headers: this._headers,
         body:JSON.stringify({name, link}),
      }).then(this._handleError); 
   }
   

   deleteCard(cardId) {
      return fetch(this._url + `cards/${cardId}`, {
         method:'DELETE',
         headers: this._headers,
      }).then(this._handleError); 
   }

   setUserInfo({name, about}) {
      return fetch(this._url + 'users/me', {
         method:'PATCH',
         headers: this._headers,
         body:JSON.stringify({name, about}),
      }).then(this._handleError); 
   }
   
   setLike(cardId) {
      return fetch(this._url + `cards/likes/${cardId}`, {
         method:'PUT',
         headers: this._headers
      }).then(this._handleError);
   }

   deleteLike(cardId) {
      return fetch(this._url + `cards/likes${cardId}`, {
         method:'DELETE',
         headers: this._headers
      }).then(this._handleError);
   }

   setUserAvatar({avatar}) {
      return fetch(this._url + 'users/me/avatar', {
         method:'PATCH',
         headers: this._headers,
         body:JSON.stringify({avatar}),
      }).then(this._handleError); 
   }
}