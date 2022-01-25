const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__field',
   submitButtonSelector: '.popup__input-save',
   inactiveButtonClass: 'popup__input-save_inactive',
   inputErrorClass: 'popup__field_input_type_error',
   errorClass: 'popup__input-error_active',
};

//Функция добавления класса "Ошибка"
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(validationConfig.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(validationConfig.errorClass);
};

//Функция удаления класса "Ошибка"
const hideInputError = (formElement, inputElement, validationConfig) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(validationConfig.inputErrorClass);
   errorElement.classList.remove(validationConfig.errorClass);
   errorElement.textContent = '';
};

//Функция проверки на валидность
const isValid = (formElement, inputElement, validationConfig) => {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
   } else {
      hideInputError(formElement, inputElement, validationConfig);
   }
};

//Функция запуска валидации в инпутах определенного элемента
const setEventListeners = (formElement, validationConfig) => {
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         isValid(formElement, inputElement, validationConfig);
         toggleButtonState(inputList, buttonElement, formElement, validationConfig);
      });
   });
};

//Функция определения элемента из массива форм
function enableValidation(validationConfig) {
   const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
   });
};


//Функция блокирования кнопки "Сохранить" при проверки валидности
const toggleButtonState = (inputList, buttonElement, formElement, validationConfig) => {
   if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;//Диактивация кнопки Сохранить
   } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;//Активация кнопки Сохранить
   }
};

const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
};

//Функция запуска валидации в инпутах определенного элемента
function clearForm(popup, validationConfig) {
   const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));
   const formElement = popup.querySelector(validationConfig.formSelector);
   const buttonElement = popup.querySelector(validationConfig.submitButtonSelector);
   inputList.forEach((inputItem) => {
      inputItem.value = '';
      hideInputError(formElement, inputItem, validationConfig);
      toggleButtonState(inputList, buttonElement, formElement, validationConfig);
   });
   buttonElement.disabled = true;
};

enableValidation(validationConfig);


