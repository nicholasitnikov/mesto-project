const config = {
    accessToken: 'a64406df-c19e-49de-ae1f-4d2f4d87c7d6',
    groupId: 'plus-cohort-2',
    apiURL: 'https://nomoreparties.co/v1'
}

export const getCards = () => {
    return new Promise((resolve, reject) => {

        fetch(`${config.apiURL}/${config.groupId}/cards`, {
            headers: {
              authorization: config.accessToken
            }
          })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    reject('Ошибка загрузки карточек...')
                }
            })
            .then((result) => {
              resolve(result);
            });

    }) 
}

export const getUser = () => {
    return new Promise((resolve, reject) => {

        fetch(`${config.apiURL}/${config.groupId}/users/me`, {
            headers: {
              authorization: config.accessToken
            }
          })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    reject('Ошибка загрузки данных пользователя...')
                }
            })
            .then((result) => {
              resolve(result);
            });

    })
}

export const updateUser = (user) => {
  return new Promise((resolve, reject) => {

    fetch(`${config.apiURL}/${config.groupId}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: config.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          about: user.description
        })
      })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                reject('Ошибка загрузки данных пользователя...')
            }
        })
        .then((result) => {
          resolve(result);
        });

  })
}

export const createCard = (name, link) => {
  return new Promise((resolve, reject) => {

    fetch(`${config.apiURL}/${config.groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: config.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      } else {
        reject('Ошибка добавления карточки');
      }
    }).then(result => {
      resolve(result);
    })

  })    
}

export const removeCard = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.apiURL}/${config.groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: config.accessToken
      }
    }).then(res => {
      if(res.ok) {
        return res.json();
      } else {
        reject('Ошибка удаления карточки')
      }
    }).then(result => {
      resolve(result);
    })
  })
}

export const removeLike = async (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.apiURL}/${config.groupId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: config.accessToken
      }
    }).then(res => {
      if(res.ok) {
        return res.json();
      } else {
        reject('Ошибка удаления лайка')
      }
    }).then(result => {
      resolve(result);
    })
  })
}

export const addLike = async (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.apiURL}/${config.groupId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: config.accessToken
      }
    }).then(res => {
      if(res.ok) {
        return res.json();
      } else {
        reject('Ошибка добавления лайка лайка')
      }
    }).then(result => {
      resolve(result);
    })
  })
}

export const updateAvatar = async (url) => {
  console.log(url)
  return new Promise((resolve, reject) => {
    fetch(`https://nomoreparties.co/v1/${config.groupId}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: config.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      } else {
        reject('Ошибка обновления аватара');
      }
    }).then(result => {
      resolve(result);
    })
  })
}