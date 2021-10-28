import { createCard, addLike, removeLike } from './api.js';
import { openPopupImage } from './modalImage.js';
import { popupPlaceAddition } from './modalAddPlace.js';
import { openPopupRemovePlace } from './modalRemovePlace.js';
import { api } from './api.js';

export default class Card {
    constructor({ card, user, cardSelector, handleRemove, handleImage }) {
        this._id = card._id;
        this._name = card.name;
        this._link = card.link;
        this._likes = card.likes;
        this._owner = card.owner;
        this._user = user;
        this._selector = cardSelector;
        this._handleRemove = handleRemove;
        this._handleImage = handleImage;
    }

    _getTemplate() {
        const element = document
        .querySelector(this._selector)
        .content
        .querySelector('.place')
        .cloneNode(true);
        return element;
    }

    _updateLikeElement() {
        this._buttonLikePlace.textContent = this._likes.length;
        if(this._likes.find(like => like._id === this._user._id)) {
            this._buttonLikePlace.classList.add('place__like_active');
        } else {
            this._buttonLikePlace.classList.remove('place__like_active');
        }
    }
    
    async _togglePlaceLike (isLiked) {
        try {
            const updatedCard = isLiked ? await api.removeLike(this._id) : await api.addLike(this._id);
            this._likes = updatedCard.likes;
            this._updateLikeElement();
        } catch (err) {
            console.log(err);
        }
    }
    
    _handlePlaceLike(e) {
        const isLiked = Array.from(e.target.classList).includes('place__like_active');
        this._togglePlaceLike(isLiked);
    }

    _setEventListeners() {        
        this._buttonLikePlace.addEventListener('click', (e) => this._handlePlaceLike(e));
        if(this._owner._id === this._user._id) {
            this._buttonRemovePlace.addEventListener('click', this._handleRemove);
        } else {
            this._buttonRemovePlace.remove();
        }
        this._imagePlace.addEventListener('click', () => this._handleImage());
    }

    getElement() {
        this._element = this._getTemplate();
        this._buttonRemovePlace = this._element.querySelector('.place__delete');
        this._buttonLikePlace = this._element.querySelector('.place__like');
        this._imagePlace = this._element.querySelector('.place__image');

        this._element.setAttribute('data-id', this._id);
        this._element.querySelector('.place__image').style.backgroundImage = `url(${this._link})`;
        this._element.querySelector('.place__heading').textContent = this._name;
        this._updateLikeElement();
        this._setEventListeners();
        return this._element;
    }

}


