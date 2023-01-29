import { BASE_URL } from "./constants";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getAllInfo() {
    return Promise.all([ this.getUserInfo(), this.getInitialCards() ]);
  }

  getUserInfo() {
    return fetch((this._baseUrl + '/users/me'), {
      credentials: 'include',
    })
    .then((response) => this._checkResponse(response));
  }

  getInitialCards() {
    return fetch((this._baseUrl + '/cards'), {
      credentials: 'include',
    })
    .then((response) => this._checkResponse(response));
  }

  editUserInfo({ name, about }) {
    return fetch((this._baseUrl + '/users/me'), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((response) => this._checkResponse(response));
  }

  editUserAvatar(linkAvatar) {
    return fetch((this._baseUrl + '/users/me/avatar'), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: linkAvatar
      })
    })
    .then((response) => this._checkResponse(response));
  }

  addNewCard({ name, link }) {
    return fetch((this._baseUrl + '/cards'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((response) => this._checkResponse(response));
  }

  deleteCard(cardId) {
    return fetch((this._baseUrl + '/cards/' + cardId), {
      method: 'DELETE',
      credentials: 'include',
    })
    .then((response) => this._checkResponse(response));
  }

  likeCard(cardId, like) {
    const method = (like)? 'PUT' : 'DELETE';
    return fetch((this._baseUrl + '/cards/' + cardId + '/likes'), {
      method: method,
      credentials: 'include',
    })
    .then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    if(response.ok) {
      return response.json();
    } else {
      return Promise.reject({ message: `Ошибка: ${response.status}` });
    }
  }
}

const api = new Api({ baseUrl: BASE_URL });

export default api;
