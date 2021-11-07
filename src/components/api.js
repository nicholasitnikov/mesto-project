class Api {
  constructor(config) {
    this._accessToken = config.accessToken;
    this._groupId = config.groupId;
    this._apiURL = config.apiURL;
  }

  checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitalCards() {
    return new Promise((resolve, reject) => {
      fetch(`${this._apiURL}/${this._groupId}/cards`, {
        headers: {
          authorization: this._accessToken
        }
      })
      .then(res => this.checkResponse(res))
      .then((result) => {
        resolve(result);
      });
    })
  }

  getUser() {
    return new Promise((resolve, reject) => {
      fetch(`${this._apiURL}/${this._groupId}/users/me`, {
        headers: {
          authorization: this._accessToken
        }
      })
      .then(res => this.checkResponse(res))
      .then((result) => {
        resolve(result);
      });
    })
  }

  updateUser(user) {
    return new Promise((resolve, reject) => {
      
      fetch(`${this._apiURL}/${this._groupId}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.username,
          about: user.description
        })
      })
      .then(res => this.checkResponse(res))
      .then((result) => {
        resolve(result);
      });
    })
  }

  createCard(name, link) {
    return new Promise((resolve, reject) => {
      fetch(`${this._apiURL}/${this._groupId}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          link
        })
      }).then(res => this.checkResponse(res))
        .then(result => {
        resolve(result);
      })
    })
  }

  removeCard(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this._apiURL}/${this._groupId}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._accessToken
        }
      }).then(res => this.checkResponse(res))
      .then(result => {
        resolve(result);
      })
    })
  }

  removeLike(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this._apiURL}/${this._groupId}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._accessToken
        }
      }).then(res => this.checkResponse(res))
      .then(result => {
        resolve(result);
      })
    })
  }

  addLike(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this._apiURL}/${this._groupId}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._accessToken
        }
      }).then(res => this.checkResponse(res))
      .then(result => {
        resolve(result);
      })
    })
  }

  updateAvatar(url) {
    return new Promise((resolve, reject) => {
        fetch(`${this._apiURL}/${this._groupId}/users/me/avatar `, {
          method: 'PATCH',
          headers: {
            authorization: this._accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: url
          })
        }).then(res => this.checkResponse(res)).then(result => {
          resolve(result);
        })
      })
    }

}

export const api = new Api({
  accessToken: 'a64406df-c19e-49de-ae1f-4d2f4d87c7d6',
  groupId: 'plus-cohort-2',
  apiURL: 'https://nomoreparties.co/v1'
})