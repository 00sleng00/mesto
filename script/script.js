/*--------Кнопка лайк-------------- */
for (let button of document.querySelectorAll('.element__like')) {
   button.addEventListener('click', function () {
      this.classList.toggle('element__like_active');
   });
}

/*-------------Popup-----------------*/

let popup = document.querySelector('.popup')
let popupOpen = document.querySelector('.profile__info-edit-button')
let popupClose = document.querySelector('.popup__close')
let formElement = document.querySelector('.popup__form')
let nameFrom = document.querySelector('h1.profile__info-name');
let nameInput = document.querySelector('input.popup__input-name');
let jobFrom = document.querySelector('p.profile__info-job')
let jobInput = document.querySelector('.popup__input-job')

function openPopup() {
   jobInput.value = jobFrom.textContent;
   nameInput.value = nameFrom.textContent;
   popup.classList.add('popup__opened');
}

function closePopup() {
   popup.classList.remove('popup__opened');
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

/*-----------------Форма--------------------------*/

function formSubmitHandler(evt) {
   evt.preventDefault();
   nameFrom.textContent = nameInput.value;
   jobFrom.textContent = jobInput.value;

   closePopup();

}

formElement.addEventListener('submit', formSubmitHandler);
