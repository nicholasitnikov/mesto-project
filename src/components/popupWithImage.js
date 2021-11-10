import Popup from './popup.js';
export default class PopupWithImage extends Popup {
  constructor( {selector, imageSelector}) {
    super( {selector} );
    this._imageElement = this._element.querySelector(imageSelector);    
  }
  open(src, caption) {    
    super.open();
    this._imageElement.src = src;
    this._imageElement.alt = caption;
    this._element.querySelector('.popup__caption').textContent = caption;
  }
}