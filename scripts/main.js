
// Создание переменных для блоков и элементов

const buttonEdit = document.querySelector('.profile__edit');
const popupEditUser = document.querySelector('.popup_role_edit');

const profileName = document.querySelector('.profile__heading');
const profileDescription = document.querySelector('.profile__description');
const fieldNameProfile = popupEditUser.querySelector('.popup__field_name_username');
const fieldDescriptionProfile = popupEditUser.querySelector('.popup__field_name_description');
const formEditUser = popupEditUser.querySelector('.form_type_useredit');
const buttonCloseEditUserPopup = popupEditUser.querySelector('.popup__close');
const places = document.querySelector('.places');
const templatePlace = document.querySelector('#placeTemplate').content;

const popupPlaceAddition = document.querySelector('.popup_role_add');
const fieldNamePlace = popupPlaceAddition.querySelector('.popup__field_name_placename');
const fieldLinkPlace = popupPlaceAddition.querySelector('.popup__field_name_placelink');
const formPlaceAddition = popupPlaceAddition.querySelector('.form_type_addplace');
const buttonClosePlaceAdditionPopup = popupPlaceAddition.querySelector('.popup__close');
const buttonPlaceAddition = document.querySelector('.profile__add-place');

const popupImage = document.querySelector('.popup_role_image');
const buttonCloseImagePopup = popupImage.querySelector('.popup__close');

const createPlace = (name, link) => {

    const elementPlace = templatePlace.querySelector('.place').cloneNode(true);

    elementPlace.querySelector('.place__image').style.backgroundImage = `url(${link})`;
    elementPlace.querySelector('.place__heading').textContent = name;

    elementPlace.querySelector('.place__like').addEventListener('click', (e) => {
        e.target.classList.toggle('place__like_active')
    })

    elementPlace.querySelector('.place__delete').addEventListener('click', (e) => {
        e.target.parentElement.remove();
    })

    elementPlace.querySelector('.place__image').addEventListener('click', (e) => {
        popupImage.classList.add('popup_opened');
        popupImage.querySelector('.popup__image').src = link.slice(link.indexOf('(') + 1, link.indexOf(')') + 1);
        popupImage.querySelector('.popup__caption').textContent = name;
    })

    return elementPlace;

}

const renderPlace = (elementPlace, prepand) => {
    if(prepand) {
        places.prepend(elementPlace);
    } else {
        places.append(elementPlace);
    }

}

// Добавление элементов по-умолчанию

initialCards.forEach((card, index) => {
    
    renderPlace(createPlace(card.name, card.link), false);

})

// Добавление обработчиков

buttonEdit.addEventListener('click', () => {
    popupEditUser.classList.add('popup_opened');
    fieldNameProfile.value = profileName.textContent;
    fieldDescriptionProfile.value = profileDescription.textContent;
})

buttonCloseEditUserPopup.addEventListener('click', (e) => {
    popupEditUser.classList.remove('popup_opened');
})

formEditUser.addEventListener('submit', (e) => {
    e.preventDefault();
    popupEditUser.classList.remove('popup_opened');
    profileName.textContent = fieldNameProfile.value;
    profileDescription.textContent = fieldDescriptionProfile.value;
})

buttonPlaceAddition.addEventListener('click', () => {
    popupPlaceAddition.classList.add('popup_opened');
    formPlaceAddition.reset();
});

buttonClosePlaceAdditionPopup.addEventListener('click', (e) => {
    popupPlaceAddition.classList.remove('popup_opened');
})

formPlaceAddition.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPlace(createPlace(fieldNamePlace.value, fieldLinkPlace.value), true);
    popupPlaceAddition.classList.remove('popup_opened');
})

buttonCloseImagePopup.addEventListener('click', () => {
    popupImage.classList.remove('popup_opened');
})