
// Список карточек, добавляемых по-умолчанию

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

// Создание переменных для блоков и элементов

const editButton = document.querySelector('.profile__edit');
const editPopup = document.querySelector('.popup_role_edit');
const closePopup = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__heading');
const profileDescription = document.querySelector('.profile__description');
const profileNameField = document.querySelector('.popup__field_name_username');
const profileDescriptionField = document.querySelector('.popup__field_name_description');
const userEditForm = document.querySelector('.form_type_useredit');
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#placeTemplate').content;

// Добавление обработчиков

editButton.addEventListener('click', () => {
    editPopup.classList.add('popup_opened');
    profileNameField.value = profileName.textContent;
    profileDescriptionField.value = profileDescription.textContent;
})

closePopup.addEventListener('click', () => {
    editPopup.classList.remove('popup_opened');
})

userEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    editPopup.classList.remove('popup_opened');
    profileName.textContent = profileNameField.value;
    profileDescription.textContent = profileDescriptionField.value;
})

// Добавление элементов по-умолчанию

initialCards.forEach((card) => {
    
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    placeElement.querySelector('.place__image').style.backgroundImage = `url(${card.link})`;
    placeElement.querySelector('.place__heading').textContent = card.name;

    places.append(placeElement);

})