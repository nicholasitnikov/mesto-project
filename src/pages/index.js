import "core-js/stable";
import "regenerator-runtime/runtime";
import './index.css';
import FormValidator from '../components/validate.js';
import Card, { handleAddCard } from '../components/card.js';
import { popupEditUser, openPopupEditUser, closePopupEditUser, buttonEdit, formEditUser } from '../components/modalEditUser.js';
import { buttonPlaceAddition, formPlaceAddition, closePopupAdditionPlace, openPopupAdditionPlace, popupPlaceAddition } from '../components/modalAddPlace.js';
import { modals, closePopup, updateSubmitText } from '../components/modal.js';
import { loadCurrentProfile, profileAvatar, handleAvatarEdit, handleUpdateAvatar, handleUpdateProfile } from '../components/profile.js';
import { buttonPlaceRemove, handleRemovePlaceButton } from '../components/modalRemovePlace.js';
import { formEditAvatar, popupEditAvatar, closePopupEditAvatar } from "../components/modalEditAvatar.js";
import { api } from '../components/api.js';
import Section from '../components/section.js';
import PopupWithForm from '../components/popupWithForm.js';
import { popupImage } from "../components/modalImage";
import PopupWithImage from '../components/popupWithImage.js';

// Включение валидации

const validationOptions = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__field-error',
    errorClass: 'popup__field-error_visible'
}

const userEditFormValidator = new FormValidator (validationOptions, document.forms.userEditForm);
const avatarEditFormValidator = new FormValidator (validationOptions, document.forms.editAvatarForm);
const cardEditFormValidator = new FormValidator (validationOptions, document.forms.addPlaceForm);
cardEditFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();
userEditFormValidator.enableValidation();

let cardsSection;

const popupWithImage = new PopupWithImage ({
    selector:'.popup_role_image',
    imageSelector: '.popup__image'
})
popupWithImage.setEventListeners();

const cardClickHandler = (e) => {
    const imageSource = e.currentTarget.querySelector('.place__image').style.backgroundImage.replace('url("','').replace('")','');
    const imageHeading = e.currentTarget.querySelector('.place__heading').textContent;
    popupWithImage.open(imageSource, imageHeading);
}

const cardRenderer = (card, user, section) => {
    const newCard = new Card({
        card, 
        user, 
        cardSelector: '#placeTemplate',
        handleRemove: function() {
            removingPopup.card = newCard;
            removingPopup.section = section;
            removingPopup.open();            
        },
        handleImage: function() {
            // console.log(this)
        }                
    });
    const cardElement = newCard.getElement();
    cardElement.addEventListener('click', cardClickHandler)
    return cardElement;
}

// Загрузка карточек и данных пользователя

Promise.all([api.getInitalCards(), loadCurrentProfile()]).then(([cards, user]) => {
    cardsSection = new Section({
        items: cards,
        itemSelector: '.place',
        renderer: function(card) {
            return cardRenderer(card, user, this)
        }
    },'.places')
    cardsSection.render();    
 }).catch(err => {
     console.log(err);
 })

const additionPopup = new PopupWithForm({
    selector: '.popup_role_add',
    openButtonSelector: '.profile__add-place',
    submitHandler: function(data) {
        this.updateSubmitText('Создание...');
        api.createCard(data.name, data.link).then(card => {

            cardsSection.addItem(card);
            cardsSection.renderLast();

            this.updateSubmitText('Создать');
            this.close();
        }).catch(err => {
            console.log(err);
            this.updateSubmitText('Ошибка');
        })
    }
});

additionPopup.setEventListeners();
// buttonPlaceAddition.addEventListener('click', () => additionPopup.open());

const removingPopup = new PopupWithForm({
    selector: '.popup_role_remove',
    submitHandler: async function() {
        this.updateSubmitText('Удаление...');
        await api.removeCard(this.card._id).then(() => {
            this.section.removeItem(this.card._id);
            this.updateSubmitText('Да');
            this.close();
        }).catch(err => {
            console.log(err);
            this.updateSubmitText('Ошибка');
        })
        
    }
})
removingPopup.setEventListeners();

const editProfilePopup = new PopupWithForm ({
    selector: '.popup_role_edit',
    openButtonSelector: '.profile__edit',
    submitHandler: async function(user) {
        this.updateSubmitText('Сохранение...');
        await api.updateUser(user).then(() => {                      
            this.updateSubmitText('Сохранить');
            this.close();
        }).catch(err => {
            console.log(err);
            this.updateSubmitText('Ошибка');
        })        
    }
})
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm ({
    selector: '.popup_role_edit-avatar',
    openButtonSelector: '.profile__avatar',
    submitHandler: async function({link}) {
        this.updateSubmitText('Сохранение...');
        await api.updateAvatar(link).then(() => {                      
            this.updateSubmitText('Сохранить');
            this.close();
        }).catch(err => {
            console.log(err);
            this.updateSubmitText('Ошибка');
        })        
    }
})
editAvatarPopup.setEventListeners();
// buttonEdit.addEventListener('click', openPopupEditUser);

// formEditUser.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     updateSubmitText(popupEditUser, 'Сохранение...');
//     try {
//         await handleUpdateProfile();
//     } catch (err) {
//         console.log(err);
//         updateSubmitText(popupEditUser, 'Ошибка');
//     } finally {
//         updateSubmitText(popupEditUser, 'Сохранить');
//         closePopupEditUser();
//     }
// })

// buttonPlaceRemove.addEventListener('click', handleRemovePlaceButton);

// profileAvatar.addEventListener('click', handleAvatarEdit)

// formEditAvatar.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     updateSubmitText(popupEditAvatar, 'Сохранение...');
//     try {
//         await handleUpdateAvatar(e.target.elements.link.value);
//     } catch (err) {
//         updateSubmitText(popupEditAvatar, 'Ошибка');
//         console.log(err);
//     } finally {
//         updateSubmitText(popupEditAvatar, 'Сохранить');
//         closePopupEditAvatar();
//     }
// })