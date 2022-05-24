export const validationObject = {
   formSelector: '.popup__form-admin',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button_type_submit',
   inactiveButtonClass: 'popup__button_type_disabled',
   inputErrorClass: 'popup__input_error',
   errorClass: 'popup__error_active'
}

export const cardAddForm = document.querySelector('.popup__form-admin_type_add');
export const cardAddBtn = document.querySelector('.profile__button_type_add');
export const popupCardImg = document.querySelector('.popup__image');
export const popupCardCaption = document.querySelector('.popup__caption');

export const profileEditBtn = document.querySelector('.profile__button_type_edit');
export const profileEditForm = document.querySelector('.popup__form-admin_type_edit');
export const profileNameInput = document.querySelector('.popup__input_type_name');
export const profileDescriptionInput = document.querySelector('.popup__input_type_about');
export const avatarEditForm = document.querySelector('.popup__form-admin_type_avatar_edit');
export const avatarEditBtn = document.querySelector('.profile__avatar');