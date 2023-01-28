import React, { useRef, useEffect } from 'react';
import Popup from './Popup';
import { validationParams } from '../utils/constants';
import { validation } from '../utils/FormValidator';

function PopupWithForm({
  title,
  name,
  classContainer,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  onResetValidators,
  onResetForm,
  children
}) {
  const formRef = useRef();
  let validator;

  useEffect(() => {
    validator = validation(validationParams, formRef.current);
    validator.enableValidation();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        formRef.current.elements[0].focus();
      }, 200);
    }
    if (onResetValidators) {
      onResetValidators(name);
    }
    formRef.current.reset();
    // validator.resetValidation();
  }, [isOpen]);

  function handleSubmit(event) {
    onSubmit(event);
    formRef.current.reset();
  }

  function handleReset() {
    if (onResetForm) {
      onResetForm();
    }
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} popupClass="popup_type_form">
      <form className={`popup__container ${classContainer} form`}
        onSubmit={handleSubmit}
        onReset={handleReset}
        name={name}
        ref={formRef}
        noValidate>
        <h2 className="form__title">
          {title}
        </h2>
        {children}
        <button className="form__save-button submit"
          type="submit">
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
