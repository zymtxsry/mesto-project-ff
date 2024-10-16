import { likeCard,  unlikeCard} from './Api.js'

export const likeIt = (evt, cardId, cardLikesCounter) => {
    const likeButton = evt.target;
    const isLiked = likeButton.classList.toggle("card__like-button_is-active");
    const apiCall = isLiked ? likeCard(cardId) : unlikeCard(cardId);
  
    apiCall
      .then((updatedCard) => {
        cardLikesCounter.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      });
  };