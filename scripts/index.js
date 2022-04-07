const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupImg = document.querySelector('.popup_type_card-preview');

const cardsList = document.querySelector('.elements__container');
const cardsForm = document.querySelector('.popup__form-admin_type_add');
const cardsFormNameInput = document.querySelector('.popup__input_type_place');
const cardsFormLinkInput = document.querySelector('.popup__input_type_link');
const popupCardImg = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');
const cardAddBtn = document.querySelector('.profile__button_type_add');
const cardsFormSubmitBtn = document.querySelector('.popup__button_type_save');

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
   const cardsTemplate = document.querySelector('#card-template').content;
   const cardsElement =  cardsTemplate.cloneNode(true);
   const cardsImage = cardsElement.querySelector('.elements__item');     
   cardsElement.querySelector('.elements__card-heading').textContent = element.name;
   cardsImage.src = element.link;
   cardsImage.alt = element.name;

   const likeBtn = cardsElement.querySelector('.elements__like');
   likeBtn.addEventListener('click', likeCard);

   const cardBtnDelete = cardsElement.querySelector('.elements__delete');
   cardBtnDelete.addEventListener('click', deleteCard);

   popupCardImg.src = element.link;
   popupCardImg.alt = element.name;
   popupCardCaption.textContent =  element.name;

   cardsImage.addEventListener('click', () => openPopup(popupImg));

   return cardsElement;
}
function likeCard(evt) {
   evt.target.classList.toggle('elements__like_active');
}

function deleteCard(evt) {
   cardsList.removeChild(evt.target.closest('.elements__card'));
}

cards.forEach(function(element) {
   cardsList.append(createCard(element));
})


function addCard(evt) {
   evt.preventDefault();

   const newCard = {};
   
   newCard.name = cardsFormNameInput.value;
   newCard.link = cardsFormLinkInput.value;
   cardsList.prepend(createCard(newCard));

   cardsFormNameInput.value = '';
   cardsFormLinkInput.value = '';
   
   closePopup(popupAdd);

   cardsFormSubmitBtn.classList.add('popup__button_type_disabled');
   cardsFormSubmitBtn.setAttribute('disabled', true);
}
cardsForm.addEventListener('submit', addCard);