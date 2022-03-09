export class Card {
   constructor(item, cardTemplateSelector, handleCardClick) {
      this._name = item.name;
      this._link = item.link;
      this._cardSelector = cardTemplateSelector;
      this._handleCardClick = handleCardClick;
      this._template = document.querySelector(this._cardSelector).content.querySelector('.card__list-item')
   }

   _getCard() { // действие с карточками
      this._cardElement = this._template.cloneNode(true);

      this._cardImage = this._cardElement.querySelector('.card__image');
      this._cardText = this._cardElement.querySelector('.card__text');
      this._deleteBtn = this._cardElement.querySelector('.card__delete');
      this._likeBtn = this._cardElement.querySelector('.card__like');

      return this._cardElement
   }

   createCard() {
      this._getCard();
      
      this._cardImage.src = this._link;
      this._cardText.textContent = this._name;
      this._cardImage.alt = this._name;

      this._setEventListeners();
      return this._cardElement;
   }

   _setEventListeners() {
   
      this._likeBtn.addEventListener('click', () => { this._likeCard() });
      this._deleteBtn.addEventListener('click', () => { this._deleteCard() });
      this._cardImage.addEventListener('click', () => { // открытие попапа картинки по клику на картинку
         this._handleCardClick(this._name, this._link)
      });
   }

   _likeCard() {// поставить и удалить лайк
      this._likeBtn.classList.toggle('card__like_active')
   };

   _deleteCard() { //Удаление карточки
      this._cardElement.remove();
   };

}
