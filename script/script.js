/*-------------Popup-----------------*/

let popup = document.querySelector('.popup')
let popupOpen = document.querySelector('.profile__info-edit-button')
let popupClose = document.querySelector('.popup__close')
let formElement = document.querySelector('.popup__form')
let nameFrom = document.querySelector('.profile__info-name');
let nameInput = document.querySelector('.popup__field_input_name');
let jobFrom = document.querySelector('.profile__info-job')
let jobInput = document.querySelector('.popup__field_input_job')

function openPopup() {// открывает popup
   jobInput.value = jobFrom.textContent;
   nameInput.value = nameFrom.textContent;
   popup.classList.add('popup_opened');
}

function closePopup() {// Закрывает popup
   popup.classList.remove('popup_opened');
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

/*-----------------Форма--------------------------*/

function formSubmitHandler(evt) {
   evt.preventDefault();
   nameFrom.textContent = nameInput.value;
   jobFrom.textContent = jobInput.value;

   closePopup();

}

formElement.addEventListener('submit', formSubmitHandler);
