import { FormValidator } from '../components/FormValidator.js'
import { initialCards, validationConfig, photoPopupSelector, photoImgSelector, photoCaptionSelector } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import '../pages/index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js'
import {Api} from "../components/Api";

let userId

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '21f71f02-2b30-453e-b34c-930853c71700',
    'Content-Type': 'application/json'
  }
})


//запрос данных профайла с сервера
const getUserInfo = api.getProfile()

//запрос данных карточек с сервера
const getCards = api.getInitialCards()

Promise.all([getUserInfo, getCards])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about)
    userInfo.setAvatar(userData.avatar)
    userId = userData._id

    cards.forEach(data => {
      const item = {
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      }
      cardSection.addInitialCards(createCard(item))
    })
  })
  .catch(err => console.log(`Ошибка загрузки данных с сервера: ${err}`))


/*-------------Popup-----------------*/
const profilePopupSelector = '.popup_type-edit';// Попап профиль
const addCardPopupSelector = '.popup_type_add-card';// Попап карточек
const deleteConfirmPopupSelector = '.popup_type_delete-confirm'; // Попап подтверждение удаления
const popupAvatarSelector = '.popup_type-avatar';


const profilePopupOpen = document.querySelector('.profile__info-edit-button');// открыть профиль
const cardAddButton = document.querySelector('.profile__info-add-button');// открытие карточек


const editForm = document.querySelector(profilePopupSelector + ' .popup__form');// профиль
const addCardForm = document.querySelector(addCardPopupSelector + ' .popup__form');// карточки
const formEditAvatar = document.querySelector(popupAvatarSelector + ' .popup__form');

const editFormValidator = new FormValidator(validationConfig, editForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);



editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

editFormValidator.clearForm();


// заполнение формы профиля
const nameFrom = document.querySelector('.profile__info-name');
const nameInput = document.querySelector('.popup__field_input_name');
const jobFrom = document.querySelector('.profile__info-job');
const jobInput = document.querySelector('.popup__field_input_job');

// Темплейт
const cardTemplateSelector = '.card__template'
const openPopupImage = new PopupWithImage(photoPopupSelector, photoImgSelector, photoCaptionSelector)

const avatarProfile = document.querySelector('.profile__avatar')

// получаем инфо пользователя
const userInfo = new UserInfo({ profileName: nameFrom, profileDescription: jobFrom, placeAvatarInput: avatarProfile });

const avatarButton = document.querySelector('.profile__icon')

/*----Заполнение формы профиля----*/
const popupProfile = new PopupWithForm(profilePopupSelector,
   (data) => {
      popupProfile.renderLoading(true)
      const { name, job } = data
      api.editProfile(name, job)
         .then(res => {
            userInfo.setUserInfo(name, job);
            popupProfile.close();
         })
        .catch(err => console.log(`Ошибка сохранения: ${err}`))
         .finally(() => {
            popupTypeAvatar.renderLoading(false)
         })
   }
)

popupProfile.setEventListeners()

profilePopupOpen.addEventListener('click', () => {// открыть профиль
   const userDescription = userInfo.getUserInfo();
   editFormValidator.clearForm(); // очистка форм профиля
   nameInput.value = userDescription.name;// форма профессия
   jobInput.value = userDescription.job;// форма имя
   popupProfile.open()

});


/*----Заполнение формы карточки----*/
const popupAdd = new PopupWithForm(
   addCardPopupSelector,
   (data) => {
      popupAdd.renderLoading(true)
      api.addCard(data.name, data.link)
         .then(res => {
            const item = {
               name: res.name,
               link: res.link,
               likes: res.likes,
               id: res._id,
               userId: userId,
               ownerId: res.owner._id
            }
            cardSection.addItem(createCard(item));
            popupAdd.close()
         })
        .catch(err => console.log(`Ошибка сохранения: ${err}`))
         .finally(() => {
            popupAdd.renderLoading(false)
         })
   }
)

popupAdd.setEventListeners()


const confirmPopup = new PopupWithSubmit(deleteConfirmPopupSelector, '.popup__input-save')
confirmPopup.setEventListeners()


cardAddButton.addEventListener('click', () => { // открытие карточек
   popupAdd.open();
   addCardFormValidator.clearForm();// валидация форм карточек
});

openPopupImage.setEventListeners();

//константа класса реализации карточки в DOM
const cardSection = new Section({
   items: [],
   renderer: (item) => {
      cardSection.addInitialCards(createCard(item))
   },
},
   '.card__list')


// ! Аватарка
const popupTypeAvatar = new PopupWithForm(popupAvatarSelector,
   (avatar) => {
      popupTypeAvatar.renderLoading(true)
      api.editAvatar(avatar)
         .then(res => {
            userInfo.setAvatar(res.avatar)
            popupTypeAvatar.close()
         })
        .catch(err => console.log(`Ошибка сохранения аватарки: ${err}`))
         .finally(() => {
            popupTypeAvatar.renderLoading(false)
         })
   })

popupTypeAvatar.setEventListeners()

avatarButton.addEventListener('click', () => {
   popupTypeAvatar.open()
   avatarFormValidator.clearForm();
});


//  Функция создания карточки

function createCard(cardData) {
   const card = new Card(cardData, cardTemplateSelector,
      (name, link) => { //  Отарытие фото попап
         openPopupImage.open(name, link);
      },
      (id) => {
         confirmPopup.open()
         confirmPopup.changeSubmitHandler(() => {
            api.deleteCard(id)
               .then(res => {
                  card.deleteCard()
                  confirmPopup.close()
               })
              .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
         })
      },
      (id) => {
         if (card.isLike()) {
            api.deleteLike(id)
               .then(res => {
                  card.setLikes(res.likes)
               })
         .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
         } else {
            api.addLike(id)
               .then(res => {
                  card.setLikes(res.likes)
               })
         .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
         }

      },
   );
   const cardElement = card.createCard();

   return cardElement
}




// Реализания карточек
cardSection.setItems()
