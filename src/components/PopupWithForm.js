import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitHandler) {
      super(popupSelector);
      this._submitHandler = submitHandler;
      this._popupForm = popupSelector.querySelector('.popup__form');
      this._inputsList = popupSelector.querySelectorAll('.popup__field');
     this._submitbutton = popupSelector.querySelector ('.popup__input-save');
     this._standartText = this._submitbutton.textContent;
   }

   _getInputValues() {
      this._inputValue = {};
      this._inputsList.forEach((input) => {
         this._inputValue[input.name] = input.value;
      });
      return this._inputValue;
   }

   changeSubmitHandler(newsubmitHandler) {
     this._submitHandler = newsubmitHandler

   }

   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', this._formSubmitHandler);
   }

   _formSubmitHandler = (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
   }

  renderLoading(isLoading){
    if(isLoading){
      this._submitbutton.textContent = 'Сохранение...'
    }
    else{
      this._submitbutton.textContent = this._standartText;
    }
  }

   close() {
      super.close();
      this._popupForm.reset();
   }
}
