
// Создание переменных для блоков и элементов

const editButton = document.querySelector('.profile__edit');
const editPopup = document.querySelector('.popup_role_edit');
const closePopup = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__heading');
const profileDescription = document.querySelector('.profile__description');
const profileNameField = document.querySelector('.popup__field_name_username');
const profileDescriptionField = document.querySelector('.popup__field_name_description');
const userEditForm = document.querySelector('.form_type_useredit');

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