import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ card, onClose, onConfirmDelete }) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirmDelete(card);
  }

  return (
    <PopupWithForm
        title="Вы уверены?"
        name="confirm-delete"
        classContainer="popup__container_type_confirmation"
        buttonText="Да"
        isOpen={card != null ? true : false}
        onClose={onClose}
        onSubmit={handleSubmit} />
  );
}

export default ConfirmDeletePopup;
