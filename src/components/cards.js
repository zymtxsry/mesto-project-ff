import { cardTemplate } from "../pages/index.js";

function createCard(element, deleteCard, likeIt, openImageModal) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    buttonDelete.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeIt);
    cardImage.addEventListener('click', () => {
      openImageModal(element.link, element.name);
    })
    return cardElement
}

function deleteCard(evt) {
    const target = evt.target.closest('.card');
    target.remove();
}

export {createCard, deleteCard};