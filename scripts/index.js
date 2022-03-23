const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const openPopupBtn = document.querySelector('.profile__button_edit');
const closePopupBtn = document.querySelector('.popup__form-button_close');
const closeFormBtn = document.querySelector('.popup__form-button_submit');
const addNewCardBtn = document.querySelector('.profile__button_add');
const closePopupAddBtn = document.querySelector('.popup__form-button_reset');
const popupImg = document.querySelector('.popup_img');
const popupCardImg = document.querySelectorAll('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');
const popupOpenImg = document.querySelector('.elements__item');
const popupCloseImg = document.querySelector('.popup__form-button_esc');

function openPopup() {
   popupEdit.classList.add('popup_opened');
}
function closePopup() {
   popupEdit.classList.remove('popup_opened');
}
function openPopupAdd() {
   popupAdd.classList.add('popup_opened');
}
function closePopupAdd() {
   popupAdd.classList.remove('popup_opened');
}

function openPopupImg() {
   popupImg.classList.add('popup_opened');
}

function closePopupImg() {
   popupImg.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
closeFormBtn.addEventListener('click', closePopup);
addNewCardBtn.addEventListener('click', openPopupAdd);
closePopupBtn.addEventListener('click', closePopupAdd);
closePopupAddBtn.addEventListener('click', closePopupAdd);


const profileEditButton = document.querySelector('.profile__button_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = document.querySelector('.popup__form-admin');
const profileNameInput = document.querySelector('.popup__form-item_el_name');
const profileDescriptionInput = document.querySelector('.popup__form-item_el_description');

function formSubmitHandler (evt) {
   evt.preventDefault();
   
   profileName.textContent =  profileNameInput.value;
   profileDescription.textContent =  profileDescriptionInput.value;

}
profileEditForm.addEventListener('submit', formSubmitHandler);

const cardsList = document.querySelector('.elements__container');
const cardsTemplate = document.querySelector('#card-template').content;
const cardsName = document.querySelector('.elements__card-heading');
const cardsForm = document.querySelector('.popup__form-admin_add');
const cardsFormNameInput = document.querySelector('.popup__form-item_el_place');
const cardsFormLinkInput = document.querySelector('.popup__form-item_el_link');
const cardsFormSubmitBtn = document.querySelector('.popup__form-button_add');

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

   function createCard(element) {
      const cardsTemplate = document.querySelector('#card-template').content;
      const cardsElement =  cardsTemplate.cloneNode(true);
      
      cardsElement.querySelector('.elements__card-heading').textContent = element.name;
      cardsElement.querySelector('.elements__item').src = element.link;
      cardsElement.querySelector('.elements__item').alt = element.name;
      const likeBtn = cardsElement.querySelector('.elements__like');
      likeBtn.addEventListener('click', function(event) {
         event.target.classList.toggle('elements__like_active');
      });

      const deleteBtn = cardsElement.querySelector('.elements__delete');
      deleteBtn.addEventListener('click', function(event) {
         cardsList.removeChild(event.target.closest('.elements__card'));
      });

      const openImgBtn = cardsElement.querySelector('.elements__item');
      openImgBtn.addEventListener('click', function() {
         openPopupImg()
         const popupCardImg = document.querySelectorAll('.popup__image');
         popupCardImg.src = element.link;
         popupCardImg.alt = element.name;
         popupCardCaption.textContent =  element.name;
      })

      popupCloseImg.addEventListener('click', closePopupImg);

      return cardsElement;
      }


      cards.forEach(function(element) {
      cardsList.append(createCard(element));
   })
   
   function addCard(event) {
      event.preventDefault();
      
      const newCard = {};
      newCard.name = cardsFormNameInput.value;
      newCard.link = cardsFormLinkInput.value;
      cardsList.prepend(createCard(newCard));
   
      closePopupAdd();
   }
   cardsForm.addEventListener('submit', addCard);