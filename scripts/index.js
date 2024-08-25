// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const listCard = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(element, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').scr = element.link;
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
    listCard.append(createCard(element, deleteCard))
});

