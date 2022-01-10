/*-------------Popup-----------------*/

const popup = document.querySelector('.popup_type-edit');// Поапап профиль
const addCard = document.querySelector('.popup_type_add-card');// Попап карточек


const popupOpen = document.querySelector('.profile__info-edit-button');// открыть профиль
const popupClose = popup.querySelector('.popup__close');//   закрыть профиль

const cardAddButton = document.querySelector('.profile__info-add-button');// открытие карточек
const popupCloseCard = addCard.querySelector('.popup__close');// закрытие карточек



function toogleModal(modal) {// открытие попап
   jobInput.value = jobFrom.textContent;// форма профессия
   nameInput.value = nameFrom.textContent;// форма имя
   modal.classList.toggle('popup_opened');
}

popupOpen.addEventListener('click', () => toogleModal(popup));
popupClose.addEventListener('click', () => toogleModal(popup));

cardAddButton.addEventListener('click', () => toogleModal(addCard));
popupCloseCard.addEventListener('click', () => toogleModal(addCard));


/*-----------------Форма--------------------------*/

const editForm = popup.querySelector('.popup__form');// профиль
const addCardForm = addCard.querySelector('.popup__form');// карточки

// заполнение формы карточек
const fieldCardName = document.querySelector('.popup__field_card_name');
const fieldCardLink = document.querySelector('.popup__field_card_link');

// заполнение формы профиля
const nameFrom = document.querySelector('.profile__info-name');
const nameInput = document.querySelector('.popup__field_input_name');
const jobFrom = document.querySelector('.profile__info-job');
const jobInput = document.querySelector('.popup__field_input_job');


// Форма профиля
editForm.addEventListener('submit', (evt) => {
   evt.preventDefault();

   nameFrom.textContent = nameInput.value;
   jobFrom.textContent = jobInput.value;

   toogleModal(popup);

});

// форма карточки
addCardForm.addEventListener('submit', (evt) => {
   evt.preventDefault();

   createCard({
      name: fieldCardName.value,
      link: fieldCardLink.value
   })

   toogleModal(addCard);



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

function createCard(cardData) { // действие с карточками
   const cardElement = cardTemplate.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardText = cardElement.querySelector('.card__text');
   const deleteBtn = cardElement.querySelector('.card__delete');
   const likeBtn = cardElement.querySelector('.card__like');

   cardText.textContent = cardData.name
   cardImage.src = cardData.link


   likeBtn.addEventListener('click', likeCard);
   deleteBtn.addEventListener('click', deleteCard);

   list.prepend(cardElement);
};


initialCards.forEach(createCard);



