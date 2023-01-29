import { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ user, onLogout }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function openMenu() {
    isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
  }

  return (
    <header className="header">
      <div className="header__logo" />
      <button className={`header__menu-button header__menu-button_type_${isMenuOpen ? "close" : "burger"} button`}
        type="button"
        onClick={openMenu}
        aria-label="Открыть меню" />
      <div className={`header__menu ${isMenuOpen && "header__menu_visible"}`}>
        <p className="header__user">{user?.email}</p>
        <Switch>
          <Route path="/" exact>
            <Link to="/signin"
              className="header__logout link"
              onClick={onLogout}>
              Выйти
            </Link>
          </Route>
          <Route path="/signin">
            <Link to="/signup"
              className="header__link link">
              Регистрация
            </Link>
          </Route>
          <Route path="/signup">
            <Link to="/signin"
              className="header__link link">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
