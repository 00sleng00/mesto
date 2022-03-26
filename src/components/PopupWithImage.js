import Popup from './Popup.js'
import {photoCaptionSelector, photoImgSelector, photoPopupSelector} from "../utils/constants";

export default class PopupWithImage extends Popup {
   constructor(photoPopupSelector, photoImgSelector, photoCaptionSelector) {
      super(photoPopupSelector)
      this._image = this._popup.querySelector(photoImgSelector);
      this._name = this._popup.querySelector(photoCaptionSelector);
   }

   open(name, link) {

      this._image.src = link;
      this._image.alt = name;
      this._name.textContent = name;

      super.open();
   }
}

