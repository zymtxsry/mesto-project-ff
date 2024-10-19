import "./index.css";
export {
  cardTemplate,
  editPopup,
  buttonEdit,
  nameInput,
  descriptionInput,
  modalImage,
  cardsContainer,
  profileNameContent,
  profileDescriptionContent,
  openImageModal,
};
import { likeIt } from "../components/like.js";
import { createCard } from "../components/cards.js";
import {
  closePopup,
  openPopup,
  setCloseModalWindowEventListeners,
} from "../components/modal.js";

import {
  enableValidation,
  clearValidationError,
} from "../components/validationForms.js";
import {
  fetchUserAndCard,
  updateAvatar,
  updateUserInfo,
  addNewCard,
  deleteCard,
} from "../components/Api.js";

// --- Элементы DOM ---
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const buttonEdit = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

const buttonAdd = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const modalImage = document.querySelector(".popup_type_image");
const modalImageElement = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");
const modalDeleteCard = document.querySelector(".popup_type_delete");
const popupForm = document.querySelectorAll(".popup__form");

// --- Поля ввода ---
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

// --- Элементы профиля пользователя ---
const profileDescriptionContent = document.querySelector(
  ".profile__description"
);
const profileNameContent = document.querySelector(".profile__title");
const profileAvatarElement = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarInput = avatarPopup.querySelector("#avatar-input");

// --- API ---
let cardToDelete;
export const config = {
  apiCardUrl: "https://nomoreparties.co/v1/pwff-cohort-1/cards",
  apiUserUrl: "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
  headers: {
    authorization: "41ce62a6-5c37-4823-b0b9-aa8fc9485959",
    "Content-Type": "application/json",
  },
};

let userId = null;

function buttonLoading(popup, loadingText, mainText) {
  popup.querySelector(".button").textContent = loadingText;
  return function () {
    popup.querySelector(".button").textContent = mainText;
  };
}

// --- Управление аватаром ---
profileAvatarElement.addEventListener("click", () => {
  avatarInput.value = "";
  openPopup(avatarPopup);
  clearValidationError(avatarPopup.querySelector(".popup__form"));
});

avatarPopup
  .querySelector(".popup__form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const avatarData = { avatar: avatarInput.value };
    const resetButtonText = buttonLoading(
      avatarPopup,
      "Сохранение...",
      "Сохранить"
    );

    updateAvatar(avatarData, config)
      .then((responseData) => {
        profileAvatarElement.style.backgroundImage = `url(${
          responseData.avatar
        }?t=${Date.now()})`;
        closePopup(avatarPopup);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        resetButtonText();
      });
  });

// --- Удаление карточки ---
export function handleDeleteClick(cardId, cardElement) {
  cardToDelete = { id: cardId, element: cardElement };
  openPopup(modalDeleteCard);
}

modalDeleteCard
  .querySelector(".popup__container")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__button") && cardToDelete) {
      deleteCard(cardToDelete.id, config, () => {
        cardToDelete.element.remove()
      })
        .then(() => {
          closePopup(modalDeleteCard);
          cardToDelete = null;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

modalDeleteCard.querySelector(".popup__close").addEventListener("click", () => {
  closePopup(modalDeleteCard);
});

// --- Редактирование профиля ---
buttonEdit.addEventListener("click", () => {
  nameInput.value = profileNameContent.textContent;
  descriptionInput.value = profileDescriptionContent.textContent;
  openPopup(editPopup);
  clearValidationError(editPopup.querySelector(".popup__form"));
});

function editProfileFormSubmit(event) {
  event.preventDefault();
  const nameUpdate = nameInput.value;
  const aboutUpdate = descriptionInput.value;
  const resetButtonText = buttonLoading(
    editPopup,
    "Сохранение...",
    "Сохранить"
  );

  updateUserInfo(nameUpdate, aboutUpdate, config)
    .then((data) => {
      profileNameContent.textContent = data.name;
      profileDescriptionContent.textContent = data.about;
      closePopup(editPopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      resetButtonText();
    });
}

editPopup
  .querySelector(".popup__form")
  .addEventListener("submit", editProfileFormSubmit);

// --- Добавление новой карточки ---
buttonAdd.addEventListener("click", () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openPopup(newCardPopup);
  clearValidationError(newCardPopup.querySelector(".popup__form"));
});

newCardPopup
  .querySelector(".popup__form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const newCardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };

    const restoreButtonText = buttonLoading(
      newCardPopup,
      "Сохранение...",
      "Сохранить"
    );

    addNewCard(newCardData, config)
      .then((res) => {
        const newCard = createCard(
          {
            name: res.name,
            link: res.link,
            likes: res.likes,
            id: res._id,
            ownerId: res.owner._id,
          },
          userId,
          likeIt,
          openImageModal,
          cardTemplate,
          handleDeleteClick
        );
        cardsContainer.prepend(newCard);
        closePopup(newCardPopup);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        restoreButtonText();
      });
  });

// --- Модальное окно изображения ---
function openImageModal(link, name) {
  modalImageElement.src = link;
  modalImageElement.alt = name;
  modalImageCaption.textContent = name;
  openPopup(modalImage);
}

// --- Закрытие модальных окон ---
[editPopup, newCardPopup, modalImage, modalDeleteCard, avatarPopup].forEach(
  (popup) => {
    setCloseModalWindowEventListeners(popup);
  }
);

// --- Валидация форм ---
enableValidation(popupForm);

// --- Начальная загрузка данных ---
fetchUserAndCard(config)
.then(([userInfo, cardsData]) => {
  profileNameContent.textContent = userInfo.name;
  profileDescriptionContent.textContent = userInfo.about;
  profileAvatarElement.style.backgroundImage = `url(${userInfo.avatar})`;
        userId = userInfo._id;
  
        cardsData.forEach((card) => {
          const element = {
            name: card.name,
            link: card.link,
            likes: card.likes,
            id: card._id,
            ownerId: card.owner._id,
          };
          cardsContainer.append(
            createCard(
              element,
              userId,
              likeIt,
              openImageModal,
              cardTemplate,
              handleDeleteClick
            )
          );
        });
      })
      .catch((error) => {
        throw error;
      });

