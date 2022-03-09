import { FormValidator } from '../components/FormValidator.js'
//import { openPopup, closePopup } from '../utils.js';
import { initialCards, validationConfig, photoPopup, photoImg, photoCaption } from '../components/constants.js'
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

// получаем инфо пользователя
const userInfo = new UserInfo({ profileName: nameFrom, profileDescription: jobFrom });

/*----Заполнение формы профиля----*/

const popupProfile = new PopupWithForm( profilePopup,
      (data) => {
      userInfo.setUserInfo(data);
      console.log('data', data )
      popupProfile.close();
   }
)


profilePopupOpen.addEventListener('click', () => {// открыть профиль

   const userDescription = userInfo.getUserInfo();
  editFormValidator.clearForm(); // очистка форм профиля
   nameInput.value = userDescription.name;
   jobInput.value = userDescription.job;
   //jobInput.value = newUserData.job;// форма профессия
   //nameInput.value = newUserData.name;// форма имя

   //
   popupProfile.open()
  //popupProfile.setEventListeners()

 // console.log('Это мы дебажим', userDescription, nameInput,  jobInput)
});

/*----Заполнение формы карточки----*/
const popupAdd = new PopupWithForm(
   addCardPopup,
   ( data ) => {
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


const openPopupImage = new PopupWithImage(photoPopup, photoImg, photoCaption)



/*-----Закрытие попапов на крестик и Overlay-----*/

// popups.forEach((popup) => { //
//    popup.addEventListener('click', (evt) => {
//       if (evt.target.classList.contains('popup_opened')) {
//          closePopup(popup)
//       }
//       if (evt.target.classList.contains('popup__close')) {
//          closePopup(popup)
//       }
//    })
// });


// заполнение формы карточек
const fieldCardName = document.querySelector('.popup__field_card_name');
const fieldCardLink = document.querySelector('.popup__field_card_link');




/*----Заполнение формы профиля----*/

// editForm.addEventListener('submit', (evt) => {
//    evt.preventDefault();

//    nameFrom.textContent = nameInput.value;
//    jobFrom.textContent = jobInput.value;

//    //closePopup(profilePopup);

// });

/*----Заполнение формы карточки----*/

// addCardForm.addEventListener('submit', (evt) => {
//    evt.preventDefault();

//    const item = {
//       name: fieldCardName.value,
//       link: fieldCardLink.value
//    }

//    const cardElement = createCard(item);
//    list.prepend(cardElement);

//    // closePopup(addCardPopup);

//    evt.target.reset();
// });



/* --------Отарытие фото попап------*/

function handleCardClick(name, link) {
   openPopupImage.open(name, link)
  //openPopupImage.setEventListeners();
}

const list = document.querySelector('.card__list');
const cardTemplateSelector = '.card__template'

// константа класса реализации карточки в DOM
const cardSection = new Section({
   items: initialCards,
   renderer: (item) => {
      cardSection.addItem(createCard(item))
   },
},
   '.card__list')

/*----Функция создания карточки----*/

function createCard(cardData) {
  console.log('createCard', cardData)
   const card = new Card(cardData, cardTemplateSelector, handleCardClick);
   const cardElement = card.createCard();
   return cardElement
}

// Реализания карточек
cardSection.setItems()

// initialCards.forEach((item) => {
//    const cardElement = createCard(item);
//    list.prepend(cardElement);
// })


