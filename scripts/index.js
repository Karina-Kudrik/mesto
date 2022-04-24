import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { validationObject, cards } from "./constants.js";


const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupImg = document.querySelector('.popup_type_card-preview');

const cardList = document.querySelector('.elements__container');
const cardForm = document.querySelector('.popup__form-admin_type_add');
const cardFormNameInput = document.querySelector('.popup__input_type_place');
const cardFormLinkInput = document.querySelector('.popup__input_type_link');
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
   popup.addEventListener('mousedown', closePopupOnOverlay);
}

function closePopup(popup){
   document.removeEventListener('keydown', closePopupOnEsc);
   popup.removeEventListener('mousedown', closePopupOnOverlay);
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
}

Array.from(document.querySelectorAll(".popup__button_type_close")).forEach((element) => {
   element.addEventListener("click", clickCloseIcon);
})

profileEditBtn.addEventListener('click', () => {
   openPopup(popupEdit);
   profileValidator.resetValidation();
})

cardAddBtn.addEventListener('click', () => {
   openPopup(popupAdd);
   createCardValidator.resetValidation();
})

function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   
   profileName.textContent =  profileNameInput.value;
   profileDescription.textContent =  profileDescriptionInput.value;
   closePopup(popupEdit);
}
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardClick(name, link) {
   popupCardImg.src = link;
   popupCardCaption.textContent = name;
   popupCardImg.alt = name;
   openPopup(popupImg);
}
function createCard(item) {
   const card = new Card (item, '.card-template', handleCardClick);
   const cardElement = card.generateCard();
   return cardElement;
}

cards.forEach((item) => {
   const cardElement = createCard(item, '.card-template', handleCardClick);
   cardList.append(cardElement);
})

function addCard(evt) {
   evt.preventDefault();

   const newCard = createCard({name:cardFormNameInput.value, link:cardFormLinkInput.value},'.card-template', handleCardClick);
   cardList.prepend(newCard);

   cardForm.reset();
   closePopup(popupAdd);
}
cardForm.addEventListener('submit', addCard);

const profileValidator = new FormValidator(validationObject, profileEditForm); 
profileValidator.enableValidation(); 

const createCardValidator = new FormValidator(validationObject, cardForm); 
createCardValidator.enableValidation(); 