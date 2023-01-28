import Popup from './Popup';

function ImagePopup({ card, onClose }) {
  return (
      <Popup isOpen={card != null} onClose={onClose} popupClass="popup_type_zoom-image">
      <figure className="popup__content-image">
        <img src={card?.link}
          className="popup__zoom-image"
          alt={card?.name} />
        <figcaption className="popup__zoom-caption">
          {card?.name}
        </figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
