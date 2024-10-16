import {
  config,
  cardsContainer,
} from "../pages/index.js";

import { createCard } from "./cards.js";

export let userId = null;

// Обработка ответа от сервера
export function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Функция добавления новой карточки
export function addNewCard(data) {
  return fetch(`${config.apiCardUrl}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

// Лайк карточки
export function likeCard(cardId) {
  return fetch(`${config.apiCardUrl}/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

// Удаление лайка карточки
export function unlikeCard(cardId) {
  return fetch(`${config.apiCardUrl}/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

// Функция получения данных пользователя и карточек
export function fetchUserAndCard(name, description, avatar) {
  Promise.all([
    fetch(config.apiUserUrl, { headers: config.headers }).then(handleResponse),
    fetch(config.apiCardUrl, { headers: config.headers }).then(handleResponse),
  ])
    .then(([userInfo, cardsData]) => {
      name.textContent = userInfo.name;
      description.textContent = userInfo.about;
      avatar.style.backgroundImage = `url(${userInfo.avatar})`;
      userId = userInfo._id;

      cardsData.forEach((card) => {
        const element = {
          name: card.name,
          link: card.link,
          likes: card.likes,
          id: card._id,
          ownerId: card.owner._id,
        };
        cardsContainer.append(createCard(element, userId));
      });
    })
    .catch((error) => {
      throw error;
    });
}

// Обновление информации о пользователе
export function updateUserInfo(name, about) {
  return fetch(`${config.apiUserUrl}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
}

// Обновление аватара
export function updateAvatar(data) {
  return fetch(`${config.apiUserUrl}/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

// Удаление карточки
export function deleteCard(cardId, cardElement) {
  fetch(`${config.apiCardUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .then(() => {
      cardElement.remove();
    });
}
