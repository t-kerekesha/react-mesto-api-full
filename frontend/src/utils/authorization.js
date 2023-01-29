export const BASE_URL = 'http://localhost:3000';

export function register(email, password) {
  return fetch((BASE_URL + '/signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(checkResponse);
}

export function login(email, password) {
  return fetch((BASE_URL + '/signin'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(checkResponse);
}

export function getCurrentUser() {
  return fetch((BASE_URL + '/users/me'), {
    method: 'GET',
    credentials: 'include',
  })
  .then(checkResponse);
}

export function logout() {
  return fetch((BASE_URL + '/users/me'), {
    method: 'DELETE',
    credentials: 'include'
  })
  .then(checkResponse);
}

function checkResponse(response) {
  if(response.ok) {
    return response.json();
  } else {
    return response.json().then((error) => Promise.reject(error));
  }
}
