const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupBtnOpen = document.querySelector('.profile__button_type_edit');
const popupBtnClose = document.querySelector('.popup__button_type_close');
const formBtnClose = document.querySelector('.popup__button_type_submit');
const newCardBtnAdd = document.querySelector('.profile__button_type_add');
const popupAddBtnClose = document.querySelector('.popup__button_type_reset');
const popupImg = document.querySelector('.popup_type_card-preview');
const popupCardImg = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');
const popupOpenImg = document.querySelector('.elements__item');
const popupCloseImg = document.querySelector('.popup__button_type_esc');

function openPopup(popup) {
   popup.classList.add('popup_opened');
}
function closePopup(popup) {
   popup.classList.remove('popup_opened');
}

popupBtnOpen.addEventListener('click', () => openPopup(popupEdit));
popupBtnClose.addEventListener('click', () => closePopup(popupEdit));
formBtnClose.addEventListener('click', () => closePopup(popupEdit));
newCardBtnAdd.addEventListener('click', () => openPopup(popupAdd));
formBtnClose.addEventListener('click', () => closePopup(popupAdd));
popupAddBtnClose.addEventListener('click',() => closePopup(popupAdd));

const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = document.querySelector('.popup__form-admin');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');

function formSubmitHandler (evt) {
   evt.preventDefault();
   
   profileName.textContent =  profileNameInput.value;
   profileDescription.textContent =  profileDescriptionInput.value;

}
profileEditForm.addEventListener('submit', formSubmitHandler);

const cardsList = document.querySelector('.elements__container');
const cardsTemplate = document.querySelector('#card-template').content;
const cardsName = document.querySelector('.elements__card-heading');
const cardsForm = document.querySelector('.popup__form-admin_type_add');
const cardsFormNameInput = document.querySelector('.popup__input_type_place');
const cardsFormLinkInput = document.querySelector('.popup__input_type_link');
const cardsFormSubmitBtn = document.querySelector('.popup__button_type_add');

   function createCard(element) {
      const cardsTemplate = document.querySelector('#card-template').content;
      const cardsElement =  cardsTemplate.cloneNode(true);
      
      cardsElement.querySelector('.elements__card-heading').textContent = element.name;
      cardsElement.querySelector('.elements__item').src = element.link;
      cardsElement.querySelector('.elements__item').alt = element.name;
      const likeBtn = cardsElement.querySelector('.elements__like');
      likeBtn.addEventListener('click', likeCard);

      const cardBtnDelete = cardsElement.querySelector('.elements__delete');
      cardBtnDelete.addEventListener('click', deleteCard);

      const cardBtnImgPreview = cardsElement.querySelector('.elements__item');
      cardBtnImgPreview.addEventListener('click', () => {
         openPopup(popupImg);
         popupCardImg.src = element.link;
         popupCardCaption.textContent =  element.name;
      })

      popupCloseImg.addEventListener('click', () => closePopup(popupImg));

      return cardsElement;
      }
      function likeCard(event) {
         event.target.classList.toggle('elements__like_active');
      }

      function deleteCard(event) {
         cardsList.removeChild(event.target.closest('.elements__card'));
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
   
      closePopup(popupAdd);
   }
   cardsForm.addEventListener('submit', addCard);
