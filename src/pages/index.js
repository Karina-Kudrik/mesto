import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { cards, 
   validationObject, 
   popupAdd, 
   popupEdit, 
   popupImg, 
   profileEditBtn, 
   cardAddBtn, 
   profileEditForm,
   cardAddForm, 
   cardList, 
   profileName, 
   profileDescription, 
   profileNameInput, 
   profileDescriptionInput, 
   cardFormNameInput, 
   cardFormLinkInput } from '../utils/constants.js';

const popupImgPreview = new PopupWithImage(popupImg);
const userProfile = new UserInfo({profileNameSelector: profileName, profileDescriptionSelector: profileDescription});
const profileValidator = new FormValidator(validationObject, profileEditForm); 
const createCardValidator = new FormValidator(validationObject, cardAddForm);

function handleCardClick(name, link) {
   popupImgPreview.open(name, link);
}

function createCard(item) {
   const card = new Card (item, '.card-template', handleCardClick);
   const cardElement = card.generateCard();
   return cardElement;
}

const cardSection = new Section({
   items: cards,
   renderer: (item) => {
   const cardElement = createCard(item);
   cardSection.addItem(cardElement);
   }
}, cardList);

cardSection.renderer();

const popupEditForm = new PopupWithForm(popupEdit, {
   handleFormSubmit: () => {
      userProfile.setUserInfo({
         name: profileNameInput.value,
         description: profileDescriptionInput.value
      });
   }
});

const handleProfileForm = () => {
   const userInfo = userProfile.getUserInfo();
   popupEditForm.open();
   profileNameInput.value = userInfo.name;
   profileDescriptionInput.value = userInfo.description;
}

profileEditBtn.addEventListener('click', () => {
   handleProfileForm();
   profileValidator.resetValidation();
});

const popupAddForm = new PopupWithForm(popupAdd, {
   handleFormSubmit: () => {
      const newCard = createCard({
         name:cardFormNameInput.value, 
         link:cardFormLinkInput.value
      });
      cardSection.addItem(newCard);
   },
})

cardAddBtn.addEventListener('click', () => {
   popupAddForm.open();
   createCardValidator.resetValidation();
}) 

popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupImgPreview.setEventListeners();

profileValidator.enableValidation();  
createCardValidator.enableValidation(); 
