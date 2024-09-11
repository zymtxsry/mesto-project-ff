import './index.css';
import { createCard, deleteCard} from "../components/cards.js";
import { initialCards } from "../components/initialCards.js";
import { closePopup, openPopup, setCloseModalWindowEventListeners} from "../components/modal.js";
import { likeIt } from "../components/like.js"
export {cardTemplate, editPopup, buttonEdit, nameInput, descriptionInput, modalImage};

const cardTemplate = document.querySelector('#card-template').content; 
const cardsContainer = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const buttonAdd = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const modalImageElement = modalImage.querySelector('.popup__image');
const modalImageCaption = modalImage.querySelector('.popup__caption');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const profileDescriptionContent = document.querySelector('.profile__description')
const profileNameContent = document.querySelector('.profile__title');

initialCards.forEach(function(element) {
    cardsContainer.append(createCard(element, deleteCard, likeIt, openImageModal));
});

buttonEdit.addEventListener('click', () => {
    nameInput.value = profileNameContent.textContent;
    descriptionInput.value = profileDescriptionContent.textContent;
    openPopup(editPopup);
});

function editProfileFormSubmit(event) {
    event.preventDefault();
    profileNameContent.textContent = nameInput.value;
    profileDescriptionContent.textContent = descriptionInput.value;

    closePopup(editPopup);
};

editPopup.querySelector('.popup__form').addEventListener('submit', editProfileFormSubmit);

buttonAdd.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';

    openPopup(newCardPopup);
})


newCardPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
    event.preventDefault();

    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    const newCard = createCard(newCardData, deleteCard, likeIt, openImageModal);
    cardsContainer.prepend(newCard); 
    
    closePopup(newCardPopup);
});

function openImageModal (link, name) {
    
    modalImageElement.src = link;
    modalImageElement.alt = name;
    modalImageCaption.textContent = name;
  
    openPopup(modalImage);
}

setCloseModalWindowEventListeners(editPopup);
setCloseModalWindowEventListeners(newCardPopup);
setCloseModalWindowEventListeners(modalImage);


