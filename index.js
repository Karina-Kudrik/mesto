const popup = document.querySelector('.form');
const openPopupButton = document.querySelector('.profile__button-edit');
const closePopupButton = document.querySelector('.form__button-close');
const closeFormButton = document.querySelector('.form__button-submit');

function openClosePopup(){
   popup.classList.toggle('form_opened');
};
openPopupButton.addEventListener('click', openClosePopup);
closePopupButton.addEventListener('click', openClosePopup);
closeFormButton.addEventListener('click', openClosePopup);

let profileEditButton = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileEditForm = document.querySelector('.form__admin');
let profileNameInput = document.querySelector('.form__item_el_name');
let profileDescriptionInput = document.querySelector('.form__item_el_description');

function formSubmitHandler (evt) {
   evt.preventDefault();
   
   profileName.textContent =  profileNameInput.value;
   profileDescription.textContent =  profileDescriptionInput.value;

}
profileEditForm.addEventListener('submit', formSubmitHandler);