import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import * as auth from '../utils/authorization';
import { formValidators } from '../utils/FormValidator';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import PageNotFound from './PageNotFound';
import Spinner from './Spinner';
// import { validationParams } from '../utils/constants';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthSuccessful, setAuthSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let userId = localStorage.getItem('userId');

  // Pегистрация
  const register = useCallback((userData) => {
    setLoading(true);
    auth.register(userData.email, userData.password)
      .then((dataFromServer) => {
        if(dataFromServer._id) {
          setInfoTooltipOpen(true);
          setAuthSuccessful(true);
          setEmail(dataFromServer.email);
        }
      })
      .catch((error) => {
        setInfoTooltipOpen(true);
        setAuthSuccessful(false);
        setErrorMessage(error.message);
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  });

  //  Аутентификация
  const login = useCallback((userData) => {
    setLoading(true);
    auth.login(userData.email, userData.password)
      .then((data) => {
        if(data._id) {
          localStorage.setItem('userId', data._id);
          setEmail('');
          setLoggedIn(true);
          setAuthSuccessful(false);
        }
      })
      .catch((error) => {
        setInfoTooltipOpen(true);
        setAuthSuccessful(false);
        setErrorMessage(error.message);
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  });

  // Выход из регистрации
  const logout = useCallback(() => {
    setLoading(true);
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem('userId');
        setCurrentUser(null);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  }, []);

  // Проверка регистрации пользователя
  const loginCheck = useCallback(() => {
    userId = localStorage.getItem('userId');
    if(userId) {
      setLoading(true);
      auth.getCurrentUser()
        .then((user) => {
          setLoggedIn(true);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    loginCheck();
  }, [loginCheck, loggedIn]);

  // Загрузка данных пользователя и карточек
  useEffect(() => {
    if(loggedIn) {
      setLoading(true);
      api.getData()
        .then((dataFromServer) => {
          const [ user, cards ] = dataFromServer;
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [loggedIn]);

  // включение валидации форм
  // useEffect(() => {
  //   enableValidation(validationParams);
  //   console.log("formValidators", formValidators)
  // }, []);

  // const forms = useMemo(() => {
  //   const formList = Array.from(document.forms);
  //   return formList;
  // }, [document])
  // console.log("forms", forms);

  // Обновление данных пользователя
  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api.editUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  // Обновление аватара
  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api.editUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  // Добавление новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    setLoading(true);
    api.addNewCard({ name, link })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }

  // Лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => {
      return user._id === currentUser._id;
    });
    api.likeCard(card._id, !isLiked)
      .then((updatedCard) => {
        const newCards = cards.map((item) => {
          return item._id === card._id ? updatedCard : item;
        });
        setCards(newCards);
      })
      .catch((error) => console.log(error));
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter(item =>
            item._id !== card._id
          )
        );
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setErrorMessage('');
    setEditProfilePopupOpen(false);
    setAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function resetValidators(formName) {
    if(formValidators[formName]) {
      formValidators[formName].resetValidation();
    }
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        user={currentUser}
        onLogout={logout} />
      <Switch>

        <ProtectedRoute
          path="/"
          exact
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick} />
        <Route path="/signin">
          <Login isLoggedIn={loggedIn} onLogin={login} email={email} />
        </Route>
        <Route path="/signup">
          <Register isLoggedIn={loggedIn} onRegister={register} />
          {isAuthSuccessful && <Redirect to='/signin' />}
        </Route>
        <Route path="/" exact>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isAuthSuccessful={isAuthSuccessful}
        textMessage={isAuthSuccessful ?
          "Вы успешно зарегистрировались!"
          :
          "Что-то пошло не так! Попробуйте ещё раз."
        }
        errorMessage={errorMessage} />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onResetValidators={resetValidators}
        onLoading={isLoading} />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onResetValidators={resetValidators}
        onLoading={isLoading} />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onResetValidators={resetValidators}
        onLoading={isLoading} />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />

      <ConfirmDeletePopup
        card={deletedCard}
        onClose={closeAllPopups}
        onConfirmDelete={handleCardDelete} />
    </CurrentUserContext.Provider>
  );
}

export default App;
