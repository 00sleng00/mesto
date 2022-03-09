export class FormValidator {

  constructor(validationConfig, form) {
    this._form = form;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }


  //Функция добавления класса "Ошибка"
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //Функция удаления класса "Ошибка"
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //Функция проверки на валидность
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Функция блокирования кнопки "Сохранить" при проверки валидности
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;//Диактивация кнопки Сохранить
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;//Активация кнопки Сохранить
    }
  };


  //Функция запуска валидации в инпутах определенного элемента
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };


  //Функция запуска валидации в инпутах определенного элемента
  clearForm() {
    this._inputList.forEach((inputItem) => {
      inputItem.value = '';
      this._hideInputError(inputItem);
      this._toggleButtonState();
    });
    this._buttonElement.disabled = true;
  }

  //Функция определения элемента из массива форм
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

}

