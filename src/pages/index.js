import { FormValidator } from '../components/FormValidator.js'
import { initialCards, validationConfig, photoPopup, photoImg, photoCaption } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import '../pages/index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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


// заполнение формы профиля
const nameFrom = document.querySelector('.profile__info-name');
const nameInput = document.querySelector('.popup__field_input_name');
const jobFrom = document.querySelector('.profile__info-job');
const jobInput = document.querySelector('.popup__field_input_job');

// Темплейт
const list = document.querySelector('.card__list');
const cardTemplateSelector = '.card__template'

// заполнение формы карточек
const fieldCardName = document.querySelector('.popup__field_card_name');
const fieldCardLink = document.querySelector('.popup__field_card_link');

const openPopupImage = new PopupWithImage(photoPopup, photoImg, photoCaption)

// получаем инфо пользователя
const userInfo = new UserInfo({ profileName: nameFrom, profileDescription: jobFrom });

/*----Заполнение формы профиля----*/

const popupProfile = new PopupWithForm( profilePopup,
   (data) => {
      userInfo.setUserInfo(data);
      popupProfile.close();
   }
)


profilePopupOpen.addEventListener('click', () => {// открыть профиль
   const userDescription = userInfo.getUserInfo();
   editFormValidator.clearForm(); // очистка форм профиля
   nameInput.value = userDescription.name;// форма профессия
   jobInput.value = userDescription.job;// форма имя
   popupProfile.open()
   //popupProfile.setEventListeners()
});

/*----Заполнение формы карточки----*/
const popupAdd = new PopupWithForm(
   addCardPopup,
   (data) => {
      const item = {
         name: data.name,
         link: data.link
      }
      cardSection.addItem(createCard(item))
      popupAdd.close()
   }
)


cardAddButton.addEventListener('click', () => { // открытие карточек
   popupAdd.open();
   //popupAdd.setEventListeners()
   addCardFormValidator.clearForm();// валидация форм карточек
});


//  Отарытие фото попап

function handleCardClick(name, link) {
   openPopupImage.open(name, link)
   //openPopupImage.setEventListeners();
}

// константа класса реализации карточки в DOM
const cardSection = new Section({
   items: initialCards,
   renderer: (item) => {
      cardSection.addItem(createCard(item))
   },
},
   '.card__list')

//  Функция создания карточки

function createCard(cardData) {
   const card = new Card(cardData, cardTemplateSelector, handleCardClick);
   const cardElement = card.createCard();
   return cardElement
}

// Реализания карточек
cardSection.setItems()
