
// Обработка ответа от сервера
export function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Функция добавления новой карточки
export function addNewCard(data, config) {
  return fetch(`${config.apiCardUrl}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
    });
}

// Лайк карточки
export function likeCard(cardId, config) {
  return fetch(`${config.apiCardUrl}/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
    });
}

// Удаление лайка карточки
export function unlikeCard(cardId, config) {
  return fetch(`${config.apiCardUrl}/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
    });
}


// Функция получения данных пользователя и карточек
export function fetchUserAndCard(config) {
  return Promise.all([
    fetch(config.apiUserUrl, { headers: config.headers }).then(handleResponse),
    fetch(config.apiCardUrl, { headers: config.headers }).then(handleResponse),
  ])
}


// Обновление информации о пользователе
export function updateUserInfo(name, about, config) {
  return fetch(`${config.apiUserUrl}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  })
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
    });
}

// Обновление аватара
export function updateAvatar(data, config) {
  return fetch(`${config.apiUserUrl}/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
    });
}

// Удаление карточки
export function deleteCard(cardId, cardElement, config) {
  return fetch(`${config.apiCardUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}
