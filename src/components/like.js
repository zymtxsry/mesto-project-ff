import { likeCard,  unlikeCard} from './Api.js'
import { config } from "../pages/index.js";

export const likeIt = (evt, cardId, cardLikesCounter) => {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const apiCall = isLiked ? unlikeCard(cardId, config) : likeCard(cardId, config);

  apiCall
    .then((updatedCard) => {
      cardLikesCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
    })
    .catch((error) => {
      console.log(error);
    });
};