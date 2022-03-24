
popupAdd
popupImg
popupEdit
function openPopup(popup) {
   popup.classList.add('popup_opened');
}
function closePopup(popup) {
   popup.classList.remove('popup_opened');
}

popupBtnOpen.addEventListener('click', openPopup);
popupBtnClose.addEventListener('click', closePopup);
formBtnClose.addEventListener('click', closePopup);
newCardBtnAdd.addEventListener('click', openPopup(popupAdd));
formBtnClose.addEventListener('click', closePopup(popupAdd));
popupAddBtnClose.addEventListener('click', closePopup(popupAdd));









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

popupBtnOpen.addEventListener('click', openPopup);
popupBtnClose.addEventListener('click', closePopup);
formBtnClose.addEventListener('click', closePopup);
newCardBtnAdd.addEventListener('click', openPopupAdd);
formBtnClose.addEventListener('click', closePopupAdd);
popupAddBtnClose.addEventListener('click', closePopupAdd);