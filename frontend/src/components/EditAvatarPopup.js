import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onResetValidators, onLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        classContainer="popup__container_type_one-input"
        buttonText={onLoading ? "Сохранение..." : "Сохранить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        onResetValidators={onResetValidators}
      >
        <div className="form__item">
          <input id="avatar-input"
            type="url"
            ref={avatarRef}
            name="avatar"
            className="form__input input"
            placeholder="Ссылка на аватар"
            required/>
          <span className="avatar-input-error form__input-error"></span>
        </div>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
