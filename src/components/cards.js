import { handleResponse } from './Api.js'
import { likeIt } from "./like.js";
import {
  config,
  handleDeleteClick,
  openImageModal,
  cardTemplate,
} from "../pages/index.js";

export function createCard(element, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikesCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;
  cardLikesCounter.textContent = `${element.likes.length}`;

  likeButton.addEventListener("click", (evt) => {
    likeIt(evt, element.id, cardLikesCounter);
  });
  cardImage.addEventListener("click", () =>
    openImageModal(element.link, element.name)
  );

  if (element.ownerId === userId) {
    buttonDelete.style.display = "block";
    buttonDelete.addEventListener("click", () =>
      handleDeleteClick(element.id, cardElement)
    );
  } else {
    buttonDelete.style.display = "none";
  }

  return cardElement;
}

export function deleteCard(cardId, cardElement) {
  return fetch(`${config.apiCardUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .then(() => {
      cardElement.remove();
    });
}
