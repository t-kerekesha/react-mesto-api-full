import { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validationParams } from '../utils/constants';
import { validation } from '../utils/FormValidator';

function Login({ isLoggedIn, onLogin, email }) {
  const [userData, setUserData] = useState({
    email: email,
    password: ''
  });
  const formRef = useRef();

  useEffect(() => {
    if(formRef.current) {
      const validator = validation(validationParams, formRef.current);
      validator.enableValidation();
    }

        // validator.enableValidation();
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
    onLogin(userData);
  }

  if(isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <>
    {isLoggedIn && <Redirect to="/" />}
    <main className="sign">
      <form className="sign__form"
        onSubmit={handleSubmit}
        name="login"
        ref={formRef}
        noValidate>
        <h1 className="sign__title">Вход</h1>
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
          Войти
        </button>
      </form>
    </main>
    </>
  );
}

export default Login;
