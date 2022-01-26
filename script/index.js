/*-------------Popup-----------------*/
const profilePopup = document.querySelector('.popup_type-edit');// Попап профиль
const addCardPopup = document.querySelector('.popup_type_add-card');// Попап карточек
const photoPopup = document.querySelector('.popup_type_photo');// Попап фото

const profilePopupOpen = document.querySelector('.profile__info-edit-button');// открыть профиль
const profilePopupClose = profilePopup.querySelector('.popup__close');// закрыть профиль

const cardAddButton = document.querySelector('.profile__info-add-button');// открытие карточек
const popupCloseCard = addCardPopup.querySelector('.popup__close');// закрытие карточек

const photoAddButton = document.querySelector('.popup__photo-figure');// открытие фото
const popupPhotoClose = photoPopup.querySelector('.popup__close');// закрытие фото

function toggleModal(modal) {// открытие попап
   modal.classList.toggle('popup_opened');
   document.addEventListener('keydown', closePopupEscape);
   document.addEventListener('mousedown', closePopupOverlay);
};

profilePopupOpen.addEventListener('click', () => {// открыть профиль
   clearForm(profilePopup, validationConfig);
   toggleModal(profilePopup);
   jobInput.value = jobFrom.textContent;// форма профессия
   nameInput.value = nameFrom.textContent;// форма имя
});


profilePopupClose.addEventListener('click', () => toggleModal(profilePopup));// закрыть профиль

cardAddButton.addEventListener('click', () => { // открытие карточек
   toggleModal(addCardPopup);
   clearForm(addCardPopup, validationConfig);
});
popupCloseCard.addEventListener('click', () => toggleModal(addCardPopup));// закрытие карточек

popupPhotoClose.addEventListener('click', () => toggleModal(photoPopup));// закрытие фото

/*----------Закрытие попап ----------*/

function closePopup(popup) {
   document.removeEventListener('keydown', closePopupEscape);
   document.removeEventListener('mousedown', closePopupOverlay);
   popup.classList.remove('popup_opened');
};

/*----------Закрытие попап по нажатию на ESC----------*/

function closePopupEscape(evt) {
   if (evt.key === 'Escape') {
      const openPopup = document.querySelector('.popup_opened');
      closePopup(openPopup);
   }
};

/*----------Закрытие попап по нажатию на Overlay----------*/

function closePopupOverlay(evt) {
   const openPopup = document.querySelector('.popup_opened');
   if (evt.target === openPopup) {
      closePopup(openPopup);
   };
};

/*-----------------Форма--------------------------*/

const editForm = profilePopup.querySelector('.popup__form');// профиль
const addCardForm = addCardPopup.querySelector('.popup__form');// карточки

// заполнение формы карточек
const fieldCardName = document.querySelector('.popup__field_card_name');
const fieldCardLink = document.querySelector('.popup__field_card_link');

// заполнение формы профиля
const nameFrom = document.querySelector('.profile__info-name');
const nameInput = document.querySelector('.popup__field_input_name');
const jobFrom = document.querySelector('.profile__info-job');
const jobInput = document.querySelector('.popup__field_input_job');


// Заполнение формы профиля
editForm.addEventListener('submit', (evt) => {
   evt.preventDefault();

   nameFrom.textContent = nameInput.value;
   jobFrom.textContent = jobInput.value;

   toggleModal(profilePopup);

});

//Заполнение формы карточки
addCardForm.addEventListener('submit', (evt) => {
   evt.preventDefault();

   createCard({
      name: fieldCardName.value,
      link: fieldCardLink.value
   })

   toggleModal(addCardPopup);

   evt.target.reset();
});

/*-----------------Фото-------------*/

const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];

const list = document.querySelector('.card__list');
const cardTemplate = document.querySelector('.card__template').content;


function deleteCard(e) { //Удаление карточки
   e.target.closest('.card__list-item').remove()
}

function likeCard(e) {// поставить и удалить лайк
   e.target.classList.toggle('card__like_active')
}


function getCard(item) { // действие с карточками
   const cardElement = cardTemplate.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardText = cardElement.querySelector('.card__text');
   const deleteBtn = cardElement.querySelector('.card__delete');
   const likeBtn = cardElement.querySelector('.card__like');

   const photoImg = photoPopup.querySelector('.popup__photo-img');
   const photoCaption = photoPopup.querySelector('.popup__photo-caption');


   cardText.textContent = item.name
   cardImage.src = item.link
   cardImage.alt = item.name

   likeBtn.addEventListener('click', likeCard);
   deleteBtn.addEventListener('click', deleteCard);

   cardImage.addEventListener('click', () => { // открытие попапа картинки по клику на картинку
      toggleModal(photoPopup)

      photoImg.src = item.link
      photoCaption.textContent = item.name
      photoImg.alt = item.name
   });

   return cardElement
}


function createCard(cardData) {
   const cardElement = getCard(cardData)
   list.prepend(cardElement);
};





initialCards.forEach(createCard);



