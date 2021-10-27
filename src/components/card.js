import { createCard, addLike, removeLike } from './api.js';
import { openPopupImage } from './modalImage.js';
import { popupPlaceAddition } from './modalAddPlace.js';
import { openPopupRemovePlace } from './modalRemovePlace.js';
import { api } from './api.js';

const places = document.querySelector('.places');
const templatePlace = document.querySelector('#placeTemplate').content;

const fieldNamePlace = popupPlaceAddition.querySelector('.popup__field_name_placename');
const fieldLinkPlace = popupPlaceAddition.querySelector('.popup__field_name_placelink');

export const handlePlaceRemove = (id) => {
    openPopupRemovePlace(id);
}

export const removePlaceElement = (id) => {
    const place = document.querySelector(`.place[data-id="${id}"]`);
    place.remove();
}

const updateLikeElement = (element, card) => {
    const userId = document.querySelector('.profile').getAttribute('data-id');
    element.textContent = card.likes.length;
    if(card.likes.find(like => like._id === userId)) {
        element.classList.add('place__like_active');
    } else {
        element.classList.remove('place__like_active');
    }
}

const updateCardLikes = (card) => {
    const place = document.querySelector(`.place[data-id="${card._id}"]`);
    const buttonLikePlace = place.querySelector('.place__like');
    updateLikeElement(buttonLikePlace, card);
}

const togglePlaceLike = async (isLiked, id) => {
    try {
        const updatedCard = isLiked ? await api.removeLike(id) : await api.addLike(id);
        updateCardLikes(updatedCard);
    } catch (err) {
        console.log(err);
    }
}

const handlePlaceLike = (e, id) => {
    const isLiked = Array.from(e.target.classList).includes('place__like_active');
    togglePlaceLike(isLiked, id);
}

export const createPlace = (card) => {

    const userId = document.querySelector('.profile').getAttribute('data-id');

    const elementPlace = templatePlace.querySelector('.place').cloneNode(true);
    const buttonRemovePlace = elementPlace.querySelector('.place__delete');
    const buttonLikePlace = elementPlace.querySelector('.place__like');

    elementPlace.setAttribute('data-id', card._id);

    elementPlace.querySelector('.place__image').style.backgroundImage = `url(${card.link})`;
    elementPlace.querySelector('.place__heading').textContent = card.name;
    updateLikeElement(buttonLikePlace, card);

    buttonLikePlace.addEventListener('click', (e) => handlePlaceLike(e, card._id));

    if(card.owner._id === userId) {
        buttonRemovePlace.addEventListener('click', () => handlePlaceRemove(card._id));
    } else {
        buttonRemovePlace.remove();
    }

    elementPlace.querySelector('.place__image').addEventListener('click', () => openPopupImage(card.name, card.link));

    return elementPlace;

}

export const renderPlace = (elementPlace, prepand) => {
    if(prepand) {
        places.prepend(elementPlace);
    } else {
        places.append(elementPlace);
    }

}

export const handleAddCard = async () => {
    await api.createCard(fieldNamePlace.value, fieldLinkPlace.value).then(card => {
        renderPlace(createPlace(card), true);
    }).catch(err => {
        console.log(err);
    })
}