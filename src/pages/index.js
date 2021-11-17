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

const api = new Api(constants.api);
const userEditFormValidator = new FormValidator (constants.validation, document.forms.userEditForm);
const avatarEditFormValidator = new FormValidator (constants.validation, document.forms.editAvatarForm);
const cardEditFormValidator = new FormValidator (constants.validation, document.forms.addPlaceForm);
cardEditFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();
userEditFormValidator.enableValidation();

let cardsSection;

const userInfo = new UserInfo({
    api,
    nameSelector: constants.profile.nameSelector,
    aboutSelector: constants.profile.aboutSelector,
    avatarSelector: constants.profile.avatarSelector
})

const popupWithImage = new PopupWithImage ({
    selector: constants.popupImageSelector.selector,
    imageSelector: constants.popupImageSelector.imageSelector
})
popupWithImage.setEventListeners();

const cardRenderer = (card, user, section) => {
    const newCard = new Card({
        api,
        card, 
        user, 
        cardSelector: constants.cardSelector.cardSelector,
        handleRemove: function() {
            removingPopup.card = newCard;
            removingPopup.section = section;
            removingPopup.open();            
        },
        handleImage: function() {
            popupWithImage.open(card.link, card.name);
        }                
    });
    const cardElement = newCard.getElement();
    return cardElement;
}

// Загрузка карточек и данных пользователя

Promise.all([api.getInitalCards(), userInfo.getUserInfo()]).then(([cards, user]) => {
    userInfo.setUserInfo(user)
    cardsSection = new Section({
        items: cards,
        itemSelector: constants.itemSelector.itemSelector,
        renderer: function(card) {
            return cardRenderer(card, user, cardsSection)
        }
    },'.places')
    cardsSection.render();    
 }).catch(err => {
     console.log(err);
 })

const additionPopup = new PopupWithForm({
    selector: constants.popupSelector.additionPopupSelector,
    validator: cardEditFormValidator,
    submitHandler: function(data) {
        additionPopup.updateSubmitText('Создание...');
        api.createCard(data.name, data.link).then(card => {
            cardsSection.placeInto(card, true);      
            additionPopup.updateSubmitText('Создать');
            additionPopup.close();
        }).catch(err => {
            console.log(err);
            additionPopup.updateSubmitText('Ошибка');
        })
    }
});

additionPopup.setEventListeners();
document.querySelector('.profile__add-place').addEventListener('click', () => additionPopup.open());

const removingPopup = new PopupWithForm({
    selector: constants.popupSelector.removingPopupSelector,
    submitHandler: async function() {
        removingPopup.updateSubmitText('Удаление...');
        await api.removeCard(removingPopup.card._id).then(() => {
            removingPopup.section.removeItem(removingPopup.card._id);
            removingPopup.updateSubmitText('Да');
            removingPopup.close();
        }).catch(err => {
            console.log(err);
            removingPopup.updateSubmitText('Ошибка');
        })
        
    }
})
removingPopup.setEventListeners();

const editProfilePopup = new PopupWithForm ({
    selector: constants.popupSelector.editProfilePopupSelector,
    inputSelector: constants.validation.inputSelector,
    validator: userEditFormValidator,
    initialValuesSelectors: {
        username: constants.initialValuesSelectors.username,
        description: constants.initialValuesSelectors.description
    },
    submitHandler: async function(user) {
        editProfilePopup.updateSubmitText('Сохранение...');
        await api.updateUser(user).then((user) => {   
            userInfo.setUserInfo(user);                    
            editProfilePopup.updateSubmitText('Сохранить');
            editProfilePopup.close();
        }).catch(err => {
            console.log(err);
            editProfilePopup.updateSubmitText('Ошибка');
        })        
    }
})
editProfilePopup.setEventListeners();
document.querySelector('.profile__edit').addEventListener('click', () => editProfilePopup.open());

const editAvatarPopup = new PopupWithForm ({
    selector: constants.popupSelector.editAvatarPopupSelector,
    validator: avatarEditFormValidator,
    submitHandler: async function({link}) {
        editAvatarPopup.updateSubmitText('Сохранение...');
        await api.updateAvatar(link).then((user) => {
            userInfo.setUserInfo(user);                    
            editAvatarPopup.updateSubmitText('Сохранить');
            editAvatarPopup.close();
        }).catch(err => {
            console.log(err);
            editAvatarPopup.updateSubmitText('Ошибка');
        })        
    }
})
editAvatarPopup.setEventListeners();
document.querySelector('.profile__avatar').addEventListener('click', () => editAvatarPopup.open());
