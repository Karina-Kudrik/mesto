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

const iconClose = Array.from(document.querySelectorAll(".popup__button_type_close")).forEach((element) => {
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

function createCard(element) { 
   const cardTemplate = document.querySelector('#card-template').content;
   const cardElement =  cardTemplate.cloneNode(true);
   const cardImage = cardElement.querySelector('.elements__item');  
   const cardLikeBtn = cardElement.querySelector('.elements__like');
   const cardBtnDelete = cardElement.querySelector('.elements__delete');

   cardElement.querySelector('.elements__card-heading').textContent = element.name;
   cardImage.src = element.link;
   cardImage.alt = element.name;

   cardLikeBtn.addEventListener('click', likeCard);
   cardBtnDelete.addEventListener('click', deleteCard);
   cardImage.addEventListener('click', previewCardImg);
      
   return cardElement;
}

function likeCard(evt) {
   evt.target.classList.toggle('elements__like_active');
}

function deleteCard(evt) {
   cardList.removeChild(evt.target.closest('.elements__card'));
}

function previewCardImg(evt) {
   popupCardCaption.textContent = evt.target.alt;
   popupCardImg.src = evt.target.src;
   popupCardImg.alt = evt.target.alt;
   openPopup(popupImg);
}

cards.forEach(function(element) {
   cardList.append(createCard(element));
})

function addCard(evt) {
   evt.preventDefault();

   const newCard = {};
   newCard.name = cardFormNameInput.value;
   newCard.link = cardFormLinkInput.value;
   cardList.prepend(createCard(newCard));

   cardFormNameInput.value = '';
   cardFormLinkInput.value = '';
   
   closePopup(popupAdd);

   cardFormSubmitBtn.classList.add('popup__button_type_disabled');
   cardFormSubmitBtn.setAttribute('disabled', true);
}
cardForm.addEventListener('submit', addCard);