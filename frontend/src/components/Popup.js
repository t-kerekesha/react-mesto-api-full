import { useEffect } from 'react';

function Popup({ isOpen, onClose, popupClass, children }) {
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  function close(event) {
    if (event.target.classList.contains('popup_opened') ||
        event.target.classList.contains('popup__close-button')) {
        onClose();
      }
  }

  return (
    <div className={`popup ${popupClass} ${isOpen && "popup_opened"}`}
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      onMouseDown={close}>
      <button className="popup__close-button button"
        type="button"
        aria-label="Закрыть"
        onMouseDown={close}>
      </button>
      {children}
    </div>
  );
}

export default Popup;
