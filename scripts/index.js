import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validationObject = {
   formSelector: '.popup__form-admin',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button_type_submit',
   inactiveButtonClass: 'popup__button_type_disabled',
   inputErrorClass: '.popup__input_type_error',
   errorClass: 'popup__error_active'
}

const cards = [
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

const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupImg = document.querySelector('.popup_type_card-preview');

const cardList = document.querySelector('.elements__container');
const cardForm = document.querySelector('.popup__form-admin_type_add');
const cardFormNameInput = document.querySelector('.popup__input_type_place');
const cardFormLinkInput = document.querySelector('.popup__input_type_link');
const cardFormSubmitBtn = document.querySelector('.popup__button_type_save');
const cardAddBtn = document.querySelector('.profile__button_type_add');
const popupCardImg = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');

const profileEditBtn = document.querySelector('.profile__button_type_edit');
const profileEditForm = document.querySelector('.popup__form-admin');
const profileName = document.querySelector('.profile__name');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');

function openPopup(popup){
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closePopupOnEsc);
   popup.addEventListener('click', closePopupOnOverlay);
}

function closePopup(popup){
   document.removeEventListener('keydown', closePopupOnEsc);
   popup.removeEventListener('click', closePopupOnOverlay);
   popup.classList.remove('popup_opened');
}

const closePopupOnEsc = (evt) => {
   if (evt.key === 'Escape') { 
      evt.preventDefault();
      const popupActive = document.querySelector('.popup_opened');
      closePopup(popupActive);
   };
}

function closePopupOnOverlay(evt) {
   if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
   }
}

const clickCloseIcon = (evt) => {
   closePopup(evt.target.closest(".popup"));
};

Array.from(document.querySelectorAll(".popup__button_type_close")).forEach((element) => {
   element.addEventListener("click", clickCloseIcon);
});

profileEditBtn.addEventListener('click', () => openPopup(popupEdit));
cardAddBtn.addEventListener('click', () => openPopup(popupAdd));

function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   
   profileName.textContent =  profileNameInput.value;
   profileDescription.textContent =  profileDescriptionInput.value;
   closePopup(popupEdit);
}
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

function previewCardImg() {
   popupCardCaption.textContent = this._name;
   popupCardImg.src = this._link;
   popupCardImg.alt = this._name;
   openPopup(popupImg);
}

cards.forEach((item) => {
   const card = new Card (item, '.card-template', previewCardImg);
   const cardElement = card.generateCard();
   cardList.append(cardElement);
});

function addCard(evt) {
   evt.preventDefault();

   const newCard = new Card ({name:cardFormNameInput.value, link:cardFormLinkInput.value},'.card-template', previewCardImg);
   const newCardElement = newCard.generateCard();
   cardList.prepend(newCardElement);

   cardForm.reset();
   
   closePopup(popupAdd);

   cardFormSubmitBtn.classList.add('popup__button_type_disabled');
   cardFormSubmitBtn.setAttribute('disabled', true);
}
cardForm.addEventListener('submit', addCard);

const profileValidator = new FormValidator(validationObject, profileEditForm);
profileValidator.enableValidation();

const createCardValidator = new FormValidator(validationObject, cardForm);
createCardValidator.enableValidation();
