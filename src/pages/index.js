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

let userId = null;

const popupImgPreview = new PopupWithImage('.popup_type_card-preview');
const profileValidator = new FormValidator(validationObject, profileEditForm); 
const createCardValidator = new FormValidator(validationObject, cardAddForm);
const avatarValidator = new FormValidator(validationObject, avatarEditForm); 

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
      avatar: user.avatar,
   });
   userId = user._id;
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
      userId: userProfile._id
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
      const rendererFn2 = () => {
         const card = createCard(data);
         cardSection.addItem(card);
      };
      let timer = setInterval(() => {
         if (userProfile._id !== undefined) {
            clearInterval(timer);
            rendererFn2();
         }
      }, 0);
   },
}, '.elements__container');

function handleCardClick(name, link) {
   popupImgPreview.open(name, link);
}

function handleDeleteClick(card) {
   popupWithSubmit.open(card);
}

function handleLikeClick(id, toggleLike, isLiked) {
   if (isLiked) {
   api.deleteLike(id)
      .then((res) => {
         toggleLike(res.likes.length);
      }).catch((err) => console.log(err));
   } else {
   api.setLike(id)
      .then((res) => {
         toggleLike(res.likes.length);
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
      .then(({name, about, avatar, _id}) => {
         userProfile.setUserInfo({
            name: name,
            about: about,
            avatar: avatar,
            id: _id
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

popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupImgPreview.setEventListeners();
popupAvatarEdit.setEventListeners();
popupWithSubmit.setEventListeners();

profileValidator.enableValidation();  
createCardValidator.enableValidation();
avatarValidator.enableValidation();