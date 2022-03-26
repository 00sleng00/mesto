import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitSelector) {
    super(popupSelector)

    this._submit = this._popup.querySelector(submitSelector)
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitHandler = newSubmitHandler
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit.addEventListener('click', this._formSubmitHandler);
  }

  _formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._submitHandler();
  }

}
