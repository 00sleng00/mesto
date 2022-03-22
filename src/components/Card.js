export class Card {
   constructor(item, cardTemplateSelector, handleCardClick, handleDeleteCardClick, likeClickCard) {
      this._name = item.name;
      this._link = item.link;
      this._likes = item.likes;
      this._id = item.id;
     this._userId = item.userId;
       this._ownerId = item.ownerId;
      this._cardSelector = cardTemplateSelector;
      this._handleCardClick = handleCardClick;
      this._likeClickCard = likeClickCard;
      this._handleDeleteCardClick = handleDeleteCardClick;
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

     if(this._ownerId !== this._userId) {
       this._cardElement.querySelector('.card__delete').style.display = 'none'
     };

     this._setLikes()
     this._setEventListeners();



      return this._cardElement;
   }

   _setLikes(){
      const likeCountsElement = this._cardElement.querySelector('.card__like-count')
      likeCountsElement.textContent = this._likes.length
   }

   _setEventListeners() {

      this._likeBtn.addEventListener('click', () => { this._likeClickCard() });
      this._deleteBtn.addEventListener('click', () => { this._handleDeleteCardClick(this._id) });
      this._cardImage.addEventListener('click', () => { // открытие попапа картинки по клику на картинку
      this._handleCardClick(this._name, this._link)
      });
   }



   // _likeCard() {// поставить и удалить лайк
   //    this._likeBtn.classList.toggle('card__like_active')
   // };

   deleteCard() { //Удаление карточки
      this._cardElement.remove();
     this._cardElement = null;
   };

}
