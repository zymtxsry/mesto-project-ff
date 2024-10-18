
export function createCard(element, userId, likeFun, openImageModal, cardTemplate, handleDeleteClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikesCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;
  cardLikesCounter.textContent = `${element.likes.length}`;

  const userLike = element.likes.some(like => like._id === userId);
  if (userLike) {
    likeButton.classList.add('card__like-button_is-active'); 
  }

  likeButton.addEventListener("click", (evt) => {
    likeFun(evt, element.id, cardLikesCounter);
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

// export function deleteCard(cardId, cardElement, config) {
//   return fetch(`${config.apiCardUrl}/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   })
//     .then(handleResponse)
//     .then(() => {
//       cardElement.remove();
//     });
// }
