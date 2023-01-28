import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onResetValidators, onLoading }) {
  const [cardData, setCardData] = useState({
    name: '',
    link: ''
  });

  useEffect(() => {
    resetForm();
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(cardData);
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setCardData({
      ...cardData,
      [name]: value
    });
  }

  function resetForm() {
    setCardData({
      name: '',
      link: ''
    });
  }

  return (
    <PopupWithForm
        title="Новое место"
        name="add-image"
        classContainer="popup__container_type_two-input"
        buttonText={onLoading ? "Сохранение..." : "Создать"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        onResetValidators={onResetValidators}
        onResetForm={resetForm}
      >
        <div className="form__item">
          <input
            id="title-input"
            type="text"
            value={cardData?.name}
            onChange={handleChange}
            name="name"
            className="form__input input"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required/>
          <span className="title-input-error form__input-error"></span>
        </div>
        <div className="form__item">
          <input
            id="link-input"
            type="url"
            value={cardData?.link}
            onChange={handleChange}
            name="link"
            className="form__input input"
            placeholder="Ссылка на картинку"
            required/>
          <span className="link-input-error form__input-error"></span>
        </div>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
