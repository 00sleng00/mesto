import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitHandler ) {
     if (  typeof submitHandler !== "function" ){ throw Error('only func')}
      super(popupSelector);
      this._submitHandler = submitHandler;
      this._popupForm = popupSelector.querySelector('.popup__form');
      this._inputsList = popupSelector.querySelectorAll('.popup__field');
   }

   _getInputValues() {
      this._inputValue = {};
      this._inputsList.forEach((input) => {
         this._inputValue[input.name] = input.value;
      });
      return this._inputValue;
   }

   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', this._formSubmitHandler);
   }

   _formSubmitHandler = (evt) => {
       evt.preventDefault();
      this._submitHandler(this._getInputValues());
   }

   close() {
      super.close();
      this._popupForm.removeEventListener('submit', this._formSubmitHandler);
      this._popupForm.reset();
   }
}
