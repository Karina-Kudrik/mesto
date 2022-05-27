import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { 
   validationObject, 
   profileEditBtn, 
   cardAddBtn,
   avatarEditBtn, 
   profileEditForm,
   avatarEditForm,
   cardAddForm, 
   profileDescriptionInput,
   profileNameInput, 
   } from '../utils/constants.js';

const api = new Api ({
   url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
   headers: {
   authorization: '096a8c76-d2e1-4c10-8591-a3bbd245b649',
      "Content-Type": "application/json"
   }
});

const userProfile = new UserInfo({
   nameSelector: '.profile__name', 
   aboutSelector: '.profile__description', 
   avatarSelector: '.profile__avatar'
});

api
.getAllData()
.then(([cards, user]) => {
   cardSection.renderItems(cards);
   userProfile.setUserInfo({
      id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar
   });
}).catch((err) => console.log(err));

const popupWithSubmit = new PopupWithSubmit('.popup_type_confirm', {
   handleFormSubmit: (card) => {
      api
      .deleteCard(card._id)
      .then((res) => {
         card.handleCardRemove(res);
         popupWithSubmit.close();
      }).catch((err) => console.log(err));
   }
});

function createCard(card) {
   const newCard = new Card({
      id: card._id,
      name: card.name,
      link: card.link,
      likes: card.likes,
      owner: card.owner,
   },
      '.card-template',
      handleCardClick, 
      handleDeleteClick, 
      handleLikeClick
      );
      
   return newCard.generateCard();
}

const cardSection = new Section({
   renderer: (data) => {
      const card = createCard(data);
      cardSection.addItem(card);
   },
}, '.elements__container');


function handleCardClick(name, link) {
   popupImgPreview.open(name, link);
}

function handleDeleteClick(card) {
   popupWithSubmit.open(card);
}

function handleLikeClick(card) {
   if (card.isLiked) {
      api
      .deleteLike(card._id)
      .then((res) => {
         card.deleteUserLike(res.likes.length);
      }).catch((err) => console.log(err));
   } else {
      api
      .setLike(card._id)
      .then((res) => {
         card.addUserLike(res.likes.length);
      }).catch((err) => console.log(err));
   }
}

const popupEditForm = new PopupWithForm('.popup_type_profile-edit', {
   handleFormSubmit: ({name, about}) => {
      popupEditForm.renderLoading(true),
      api
      .setUserInfo({
         name,
         about
   })
      .then(({name, about, avatar}) => {
         userProfile.setUserInfo({
            name: name,
            about: about,
            avatar: avatar,
         });
         popupEditForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditForm.renderLoading(false));
   },
})

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar-edit', {
   handleFormSubmit: (item) => {
      popupAvatarEdit.renderLoading(true),
      api
      .setUserAvatar(item)
      .then((res) => {
         userProfile.setUserAvatar(res.avatar);
         popupAvatarEdit.close();
      }) 
      .catch((err) => console.log(err))
      .finally(() => popupAvatarEdit.renderLoading(false));
   },
});

const popupAddForm = new PopupWithForm('.popup_type_card-add', {
   handleFormSubmit: (data) => {
      popupAddForm.renderLoading(true);
      api
      .addCard(data)
      .then((res) => {
         cardSection.addItem(createCard(res));
         popupAddForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddForm.renderLoading(false));
   },
})

const openPopupEditForm = () => {
   const userData = userProfile.getUserInfo();
   popupEditForm.open();
   profileNameInput.value = userData.name;
   profileDescriptionInput.value = userData.about;
};

profileEditBtn.addEventListener('click', () => {
   openPopupEditForm();
   profileValidator.resetValidation();
});

cardAddBtn.addEventListener('click', () => {
   popupAddForm.open();
   createCardValidator.resetValidation();
}); 

avatarEditBtn.addEventListener('click', () => {
   popupAvatarEdit.open();
   avatarValidator.resetValidation();
})

const popupImgPreview = new PopupWithImage('.popup_type_card-preview');
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupImgPreview.setEventListeners();
popupAvatarEdit.setEventListeners();
popupWithSubmit.setEventListeners();

const profileValidator = new FormValidator(validationObject, profileEditForm); 
const createCardValidator = new FormValidator(validationObject, cardAddForm);
const avatarValidator = new FormValidator(validationObject, avatarEditForm); 

profileValidator.enableValidation();  
createCardValidator.enableValidation();
avatarValidator.enableValidation();