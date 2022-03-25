import { FormValidator } from '../components/FormValidator.js'
import { initialCards, validationConfig, photoPopup, photoImg, photoCaption } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import '../pages/index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

let userId

api.getProfile()
   .then(res => {
      userInfo.setUserInfo(res.name, res.about)
      userInfo.setAvatar(res.avatar)
      userId = res._id
   })


api.getInitialCards()
   .then(cardList => {
      cardList.forEach(data => {
         const item = {
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
         }
         cardSection.addItem(createCard(item))
      })

   })


/*-------------Popup-----------------*/
const profilePopup = document.querySelector('.popup_type-edit');// Попап профиль
const addCardPopup = document.querySelector('.popup_type_add-card');// Попап карточек
const deleteConfirmPopup = document.querySelector('.popup_type_delete-confirm'); // Попап подтверждение удаления
const popupAvatar = document.querySelector('.popup__avatar');


const profilePopupOpen = document.querySelector('.profile__info-edit-button');// открыть профиль
const cardAddButton = document.querySelector('.profile__info-add-button');// открытие карточек

const editForm = profilePopup.querySelector('.popup__form');// профиль
const addCardForm = addCardPopup.querySelector('.popup__form');// карточки
const formEditAvatar = popupAvatar.querySelector('.popup__form');

const editFormValidator = new FormValidator(validationConfig, editForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);


avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

editFormValidator.clearForm();


// заполнение формы профиля
const nameFrom = document.querySelector('.profile__info-name');
const nameInput = document.querySelector('.popup__field_input_name');
const jobFrom = document.querySelector('.profile__info-job');
const jobInput = document.querySelector('.popup__field_input_job');

// Темплейт
const cardTemplateSelector = '.card__template'
const openPopupImage = new PopupWithImage(photoPopup, photoImg, photoCaption)

const avatarProfile = document.querySelector('.profile__avatar')

// получаем инфо пользователя
const userInfo = new UserInfo({ profileName: nameFrom, profileDescription: jobFrom, placeAvatarInput: avatarProfile });

const avatarButton = document.querySelector('.profile__icon')

/*----Заполнение формы профиля----*/
const popupProfile = new PopupWithForm(profilePopup,
   (data) => {
     popupProfile.renderLoading(true)
      const { name, job } = data
      api.editProfile(name, job)
         .then(res => {
            userInfo.setUserInfo(name, job);
            popupProfile.close();
         })
        .catch(console.log)
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
   addCardPopup,
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
        .catch(console.log)
        .finally(() => {
          popupAdd.renderLoading(false)
        })
   }
)

popupAdd.setEventListeners()


const confirmPopup = new PopupWithForm(deleteConfirmPopup)
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
      cardSection.addItem(createCard(item))
   },
},
   '.card__list')


// ! Аватарка
const popupTypeAvatar = new PopupWithForm(popupAvatar,
   (avatar) => {
      popupTypeAvatar.renderLoading(true)
      api.editAvatar(avatar)
         .then(res => {
            userInfo.setAvatar(res.avatar)
            popupTypeAvatar.close()
         })
         .catch(console.log)
         .finally(() => {
            popupTypeAvatar.renderLoading(false)
         })
   })

popupTypeAvatar.setEventListeners()

avatarButton.addEventListener('click', () => {
   avatarFormValidator.clearForm();
   popupTypeAvatar.open()
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
         })
      },
      (id) => {
         if (card.isLike()) {
            api.deleteLike(id)
               .then(res => {
                  card.setLikes(res.likes)
               });
         } else {
            api.addLike(id)
               .then(res => {
                  card.setLikes(res.likes)
               });
         }

      },
   );
   const cardElement = card.createCard();

   return cardElement
}

// Реализания карточек
cardSection.setItems()
