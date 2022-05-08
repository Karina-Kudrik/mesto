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
   } from '../utils/constants.js';

const popupImgPreview = new PopupWithImage(popupImg);
const userProfile = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description' });
const profileValidator = new FormValidator(validationObject, profileEditForm); 
const createCardValidator = new FormValidator(validationObject, cardAddForm);

function handleCardClick(name, link) {
   popupImgPreview.open(name, link);
}

function createCard(data) {
   const card = new Card (data, '.card-template', handleCardClick);
   return card.generateCard();
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
   handleFormSubmit: (userData) => {
      popupEditForm.close();
      userProfile.setUserInfo(userData);
   }
});

const handleProfileForm = () => {
   const userData = userProfile.getUserInfo();
   profileName.value = userData.name;
   profileDescription.value = userData.description;
   popupEditForm.open();
}

const popupAddForm = new PopupWithForm(popupAdd, {
   handleFormSubmit: (data) => {
      const newCard = createCard(data);
      cardSection.addItem(newCard);
   },
});

profileEditBtn.addEventListener('click', () => {
   handleProfileForm();
   profileValidator.resetValidation();
});

cardAddBtn.addEventListener('click', () => {
   popupAddForm.open();
   createCardValidator.resetValidation();
}); 

popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupImgPreview.setEventListeners();

profileValidator.enableValidation();  
createCardValidator.enableValidation();
