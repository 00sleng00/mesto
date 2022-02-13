export class FormValidator {
  constructor(selector, form) {
    this._form = form;
    this._inputSelector = selector.inputSelector;
    this._submitButtonSelector = selector.submitButtonSelector;
    this._inactiveButtonClass = selector.inactiveButtonClass;
    this._inputErrorClass = selector.inputErrorClass;
    this._errorClass = selector.errorClass;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }


  //Функция добавления класса "Ошибка"
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //Функция удаления класса "Ошибка"
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

//Функция проверки на валидность
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

//Функция блокирования кнопки "Сохранить" при проверки валидности
  _toggleButtonState (buttonElement) {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;//Диактивация кнопки Сохранить
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;//Активация кнопки Сохранить
    }
  };


//Функция запуска валидации в инпутах определенного элемента
  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };


//Функция определения элемента из массива форм
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

//Функция запуска валидации в инпутах определенного элемента
  clearForm() {
    this._inputList.forEach((inputItem) => {
      inputItem.value = '';
      this._hideInputError(inputItem);
      this._toggleButtonState();
    });
    this._buttonElement.disabled = true;
  }



//   //Функция добавления класса "Ошибка"
//   _showInputError(inputElement, errorMessage) {
//     this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(this._settings.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(this._settings.errorClass);
//   };
//
//   //Функция удаления класса "Ошибка"
//   _hideInputError(inputElement) {
//     this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(this._settings.inputErrorClass);
//     errorElement.classList.remove(this._settings.errorClass);
//     errorElement.textContent = '';
//   };
//
//
//   //Функция проверки на валидность
//   _isValid(inputElement) {
//     if (!inputElement.validity.valid) {
//       this._showInputError(inputElement, inputElement.validationMessage);
//     } else {
//       this._hideInputError(inputElement);
//     }
//   };
//
//   //Функция запуска валидации в инпутах определенного элемента
//   _setEventListeners() {
//     this._inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//         this._isValid(inputElement);
//         this._toggleButtonState();
//       });
//     });
//   }
//
//
//   //Функция блокирования кнопки "Сохранить" при проверки валидности
//   _toggleButtonState = () => {
//     if (this._hasInvalidInput()) {
//       this._buttonElement.classList.add(this._settings.inactiveButtonClass);
//       this._buttonElement.disabled = true;//Диактивация кнопки Сохранить
//     } else {
//       this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
//       this._buttonElement.disabled = false;//Активация кнопки Сохранить
//     }
//   };
//
//   _hasInvalidInput = () => {
//     return this._inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
//   };
//
//
//   _clearForm(popup) {
//     const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));
//     const formElement = popup.querySelector(validationConfig.formSelector);
//     const buttonElement = popup.querySelector(validationConfig.submitButtonSelector);
//     inputList.forEach((inputItem) => {
//       inputItem.value = '';
//       hideInputError(formElement, inputItem, validationConfig);
//       toggleButtonState(inputList, buttonElement, formElement, validationConfig);
//     });
//     buttonElement.disabled = true;
//   }
//
//
//   //Функция определения элемента из массива форм
//   enableValidation() {
//     this._form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//
//     this._setEventListeners();
//   }
//
}

// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__field',
//   submitButtonSelector: '.popup__input-save',
//   inactiveButtonClass: 'popup__input-save_inactive',
//   inputErrorClass: 'popup__field_input_type_error',
//   errorClass: 'popup__input-error_active',
// };
//
// const editForm = profilePopup.querySelector('.popup__form');// профиль
// const addCardForm = addCardPopup.querySelector('.popup__form');// карточки
//
// const editFormValidator = new FormValidator (validationConfig, editForm)
// const addCardFormValidator = new FormValidator(validationConfig, addCardForm)
