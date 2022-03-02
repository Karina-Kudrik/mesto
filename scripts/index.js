let popup = document.querySelector('.form');
let openPopupButton = document.querySelector('.profile__button_edit');
let closePopupButton = document.querySelector('.form__button_close');
let closeFormButton = document.querySelector('.form__button_submit');

function openClosePopup(){
   popup.classList.toggle('form_opened');
};
openPopupButton.addEventListener('click', openClosePopup);
closePopupButton.addEventListener('click', openClosePopup);
closeFormButton.addEventListener('click', openClosePopup);

let profileEditButton = document.querySelector('.profile__button_edit');
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