import { constants } from "../utils/constants";

export default class Card {
    constructor({ card, user, cardSelector, handleRemove, handleImage, api }) {
        this._api = api;
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
        .querySelector(constants.template.templateSelector)
        .cloneNode(true);
        return element;
    }

    _updateLikeElement() {
        this._buttonLikePlace.textContent = this._likes.length;
        if(this._likes.find(like => like._id === this._user._id)) {
            this._buttonLikePlace.classList.add(constants.buttonLike.buttonLikeAtive);
        } else {
            this._buttonLikePlace.classList.remove(constants.buttonLike.buttonLikeAtive);
        }
    }
    
    async _togglePlaceLike (isLiked) {
        try {
            const updatedCard = isLiked ? await this._api.removeLike(this._id) : await this._api.addLike(this._id);
            this._likes = updatedCard.likes;
            this._updateLikeElement();
        } catch (err) {
            console.log(err);
        }
    }
    
    _handlePlaceLike(e) {
        const isLiked = Array.from(e.target.classList).includes(constants.buttonLike.buttonLikeAtive);
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
        this._buttonRemovePlace = this._element.querySelector(constants.elementSelector.buttonDelete);
        this._buttonLikePlace = this._element.querySelector(constants.elementSelector.buttonLike);
        this._imagePlace = this._element.querySelector(constants.elementSelector.buttonImage);

        this._element.setAttribute('data-id', this._id);
        this._imagePlace.style.backgroundImage = `url(${this._link})`;
        this._element.querySelector(constants.elementSelector.placeHeading).textContent = this._name;
        this._updateLikeElement();
        this._setEventListeners();
        return this._element;
    }

    

}


