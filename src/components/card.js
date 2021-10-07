import { openPopupImage } from './modalImage.js';

const places = document.querySelector('.places');
const templatePlace = document.querySelector('#placeTemplate').content;

export const removePlace = (e) => {
    e.target.parentElement.remove();
}

export const createPlace = (name, link) => {

    const elementPlace = templatePlace.querySelector('.place').cloneNode(true);

    elementPlace.querySelector('.place__image').style.backgroundImage = `url(${link})`;
    elementPlace.querySelector('.place__heading').textContent = name;

    elementPlace.querySelector('.place__like').addEventListener('click', (e) => {
        e.target.classList.toggle('place__like_active')
    })

    elementPlace.querySelector('.place__delete').addEventListener('click', (e) => removePlace(e));
    elementPlace.querySelector('.place__image').addEventListener('click', () => openPopupImage(name, link));

    return elementPlace;

}

export const renderPlace = (elementPlace, prepand) => {
    if(prepand) {
        places.prepend(elementPlace);
    } else {
        places.append(elementPlace);
    }

}
