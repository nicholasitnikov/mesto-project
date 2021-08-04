
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
const profileName = document.querySelector('.profile__heading');
const profileDescription = document.querySelector('.profile__description');
const profileNameField = editPopup.querySelector('.popup__field_name_username');
const profileDescriptionField = editPopup.querySelector('.popup__field_name_description');
const userEditForm = editPopup.querySelector('.form_type_useredit');
const userEditFormClose = editPopup.querySelector('.popup__close');
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#placeTemplate').content;

const addPlacePopup = document.querySelector('.popup_role_add');
const placeNameField = addPlacePopup.querySelector('.popup__field_name_placename');
const placeLinkField = addPlacePopup.querySelector('.popup__field_name_placelink');
const addPlaceForm = addPlacePopup.querySelector('.form_type_addplace');
const addPlaceFormClose = addPlacePopup.querySelector('.popup__close');
const addPlaceButton = document.querySelector('.profile__add-place');

const addPlace = (name, link, prepand=false) => {

    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

    placeElement.querySelector('.place__image').style.backgroundImage = `url(${link})`;
    placeElement.querySelector('.place__heading').textContent = name;

    placeElement.querySelector('.place__like').addEventListener('click', (e) => {
        console.log(e.target)
        e.target.classList.toggle('place__like_active')
    })

    placeElement.querySelector('.place__delete').addEventListener('click', (e) => {
        e.target.parentElement.remove();
    })

    if(prepand) {
        places.prepend(placeElement);
    } else {
        places.append(placeElement);
    }

}

// Добавление элементов по-умолчанию

initialCards.forEach((card, index) => {
    
    addPlace(card.name, card.link);

})

// Добавление обработчиков

editButton.addEventListener('click', () => {
    editPopup.classList.add('popup_opened');
    profileNameField.value = profileName.textContent;
    profileDescriptionField.value = profileDescription.textContent;
})

userEditFormClose.addEventListener('click', (e) => {
    editPopup.classList.remove('popup_opened');
})

userEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    editPopup.classList.remove('popup_opened');
    profileName.textContent = profileNameField.value;
    profileDescription.textContent = profileDescriptionField.value;
})

addPlaceButton.addEventListener('click', () => {
    addPlacePopup.classList.add('popup_opened');
    placeNameField.value = '';
    placeLinkField.value = '';
});

addPlaceFormClose.addEventListener('click', (e) => {
    addPlacePopup.classList.remove('popup_opened');
})

addPlaceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addPlace(placeNameField.value, placeLinkField.value, true);
    addPlacePopup.classList.remove('popup_opened');
})