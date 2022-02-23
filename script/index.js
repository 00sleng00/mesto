import { FormValidator } from './FormValidator.js'
import { openPopup, closePopup } from './utils.js';
import { initialCards, validationConfig } from './constants.js'
import { Card } from './Card.js';

/*-------------Popup-----------------*/
const profilePopup = document.querySelector('.popup_type-edit');// Попап профиль
const addCardPopup = document.querySelector('.popup_type_add-card');// Попап карточек

const profilePopupOpen = document.querySelector('.profile__info-edit-button');// открыть профиль
const cardAddButton = document.querySelector('.profile__info-add-button');// открытие карточек
const photoAddButton = document.querySelector('.popup__photo-figure');// открытие фото

const popups = document.querySelectorAll('.popup'); // попапы

const editForm = profilePopup.querySelector('.popup__form');// профиль
const addCardForm = addCardPopup.querySelector('.popup__form');// карточки

const editFormValidator = new FormValidator(validationConfig, editForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

editFormValidator.clearForm();


profilePopupOpen.addEventListener('click', () => {// открыть профиль
   editFormValidator.clearForm(); // валидация форм профиля
   openPopup(profilePopup);
   jobInput.value = jobFrom.textContent;// форма профессия
   nameInput.value = nameFrom.textContent;// форма имя
});


cardAddButton.addEventListener('click', () => { // открытие карточек
   openPopup(addCardPopup);
   addCardFormValidator.clearForm();// валидация форм карточек
});

/*-----Закрытие попапов на крестик и Overlay-----*/

popups.forEach((popup) => { //
   popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
         closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
         closePopup(popup)
      }
      if (evt.target === openPopup) { //Закрытие попап по нажатию на Overlay
         closePopup(popup);
      }
   })
});


// заполнение формы карточек
const fieldCardName = document.querySelector('.popup__field_card_name');
const fieldCardLink = document.querySelector('.popup__field_card_link');

// заполнение формы профиля
const nameFrom = document.querySelector('.profile__info-name');
const nameInput = document.querySelector('.popup__field_input_name');
const jobFrom = document.querySelector('.profile__info-job');
const jobInput = document.querySelector('.popup__field_input_job');


/*----Заполнение формы профиля----*/

editForm.addEventListener('submit', (evt) => {
   evt.preventDefault();

   nameFrom.textContent = nameInput.value;
   jobFrom.textContent = jobInput.value;

   closePopup(profilePopup);

});

/*----Заполнение формы карточки----*/

addCardForm.addEventListener('submit', (evt) => {
   evt.preventDefault();

   createCard({
      name: fieldCardName.value,
      link: fieldCardLink.value
   })

   closePopup(addCardPopup);

   evt.target.reset();
});



const list = document.querySelector('.card__list');
const cardTemplateSelector = '.card__template'


function createCard(cardData) {
   const card = new Card(cardData, cardTemplateSelector);
   const cardElement = card.createCard();
   list.prepend(cardElement);
}


initialCards.forEach(createCard);



