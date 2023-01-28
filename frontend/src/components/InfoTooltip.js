import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, isAuthSuccessful, textMessage, errorMessage }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} popupClass="popup_type_form">
      <div className="popup__container">
        <div className="popup__content-info">
          <div className={`popup__icon-info
            ${isAuthSuccessful ?
              "popup__icon-info_type_success"
              :
              "popup__icon-info_type_error"
            }`} />
          <p className="popup__message">
            {textMessage}
          </p>
        </div>
        <p className="popup__text-error">
          {errorMessage}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
