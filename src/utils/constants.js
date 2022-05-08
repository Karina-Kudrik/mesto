export const validationObject = {
   formSelector: '.popup__form-admin',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button_type_submit',
   inactiveButtonClass: 'popup__button_type_disabled',
   inputErrorClass: 'popup__input_error',
   errorClass: 'popup__error_active'
}

export const cards = [
   {  name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {  name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {  name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {  name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {   name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {   name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
   ];

export const popupEdit = document.querySelector('.popup_type_profile-edit');
export const popupAdd = document.querySelector('.popup_type_card-add');
export const popupImg = document.querySelector('.popup_type_card-preview');

export const cardList = document.querySelector('.elements__container');
export const cardAddForm = document.querySelector('.popup__form-admin_type_add');
export const cardAddBtn = document.querySelector('.profile__button_type_add');
export const popupCardImg = document.querySelector('.popup__image');
export const popupCardCaption = document.querySelector('.popup__caption');

export const profileEditBtn = document.querySelector('.profile__button_type_edit');
export const profileEditForm = document.querySelector('.popup__form-admin');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');