// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(element, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name
    cardElement.querySelector('.card__title').textContent = element.name;
    buttonDelete.addEventListener('click', deleteCard);
    return cardElement
}
// @todo: Функция удаления карточки

function deleteCard(evt) {
    const target = evt.target.closest('.card');
    target.remove()
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function(element) {
    cardsContainer.append(createCard(element, deleteCard))
});

