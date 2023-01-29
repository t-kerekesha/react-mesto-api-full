import { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { validationParams } from '../utils/constants';
import { validation } from '../utils/FormValidator';

function Register({ isLoggedIn, onRegister }) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const formRef = useRef();

  useEffect(() => {
    if(formRef.current) {
      const validator = validation(validationParams, formRef.current);
      validator.enableValidation();
    }
  }, []);

  function handleChange(event) {
    const {name, value} = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(userData);
  }

  if(isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <main className="sign">
      <form className="sign__form"
        onSubmit={handleSubmit}
        name="register"
        ref={formRef}
        noValidate>
        <h1 className="sign__title">Регистрация</h1>
        <div className="form__item">
          <input
            id="email-input"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="sign__input input"
            required />
          <span className="email-input-error form__input-error"></span>
        </div>
        <div className="form__item">
          <input
            id="password-input"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Пароль"
            className="sign__input input"
            minLength="2"
            required />
          <span className="password-input-error form__input-error"></span>
        </div>
        <button type="submit"
          className="sign__button submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__signup">
        Уже зарегистрированы?&nbsp;
        <Link to="/signin"
          className="link">
          Войти
        </Link>
      </p>
    </main>
  );
}

export default (Register);
