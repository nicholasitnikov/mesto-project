import "core-js/stable";
import "regenerator-runtime/runtime";
import './index.css';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo";
import { constants } from "../utils/constants.js";

const api = new Api({
    accessToken: constants.accessToken,
    groupId: constants.groupId,
    apiURL: constants.apiURL
})

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

const userInfo = new UserInfo({
    api,
    nameSelector: '.profile__heading',
    aboutSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
})

const popupWithImage = new PopupWithImage ({
    selector:'.popup_role_image',
    imageSelector: '.popup__image'
})
popupWithImage.setEventListeners();

const cardRenderer = (card, user, section) => {
    const newCard = new Card({
        api,
        card, 
        user, 
        cardSelector: '#placeTemplate',
        handleRemove: function() {
            removingPopup.card = newCard;
            removingPopup.section = section;
            removingPopup.open();            
        },
        handleImage: function() {
            popupWithImage.open(this._link, this._name);
        }                
    });
    const cardElement = newCard.getElement();
    return cardElement;
}

// Загрузка карточек и данных пользователя

Promise.all([api.getInitalCards(), userInfo.getUserInfo()]).then(([cards, user]) => {
    userInfo.setUserInfo()
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

            this.updateSubmitText('Создать');
            this.close();
        }).catch(err => {
            console.log(err);
            this.updateSubmitText('Ошибка');
        })
    }
});

additionPopup.setEventListeners();

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
        await api.updateUser(user).then((user) => {   
            userInfo.setData(user);   
            userInfo.setUserInfo();                    
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
        await api.updateAvatar(link).then((user) => {
            userInfo.setData(user);   
            userInfo.setUserInfo();                    
            this.updateSubmitText('Сохранить');
            this.close();
        }).catch(err => {
            console.log(err);
            this.updateSubmitText('Ошибка');
        })        
    }
})
editAvatarPopup.setEventListeners();