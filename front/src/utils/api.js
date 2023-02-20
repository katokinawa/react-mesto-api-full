class Api {
  constructor(config) {
    this._url = config.url;
    this._header = config.headers;
  }

  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._header,
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._header,
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      headers: this._header,
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }
  
  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._header,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  generateCard(name, link) {
    return fetch(`${this._url}/cards`, {
      headers: this._header,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._header,
      method: "DELETE",
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._header,
      method: `${isLiked ? "PUT" : "DELETE"}`,
    }).then((res) => {
      return this._getResponse(res);
    });
  }
}

export const api = new Api({
  url: "http://katokinawa.front.nomoredomainsclub.ru",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
