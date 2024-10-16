// import { modalImage } from "../pages/index.js";

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscUp);
    popup.addEventListener('transitionend', () => {
        if (!popup.classList.contains('popup_is-opened')) {
            popup.style.display = 'none';
        }
    }, { once: true });
}

export const handleEscUp = event => {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_is-opened');
        closePopup(activePopup);
    }
};

export function openPopup(popup) {
    popup.style.display = 'flex';
    setTimeout(() => { 
        popup.classList.add('popup_is-opened');
    }, 10);
    document.addEventListener('keydown', handleEscUp);
}

export const setCloseModalWindowEventListeners = modalElement => {
    const buttonClose = modalElement.querySelector('.popup__close');
    buttonClose.addEventListener('click', () => {
        closePopup(modalElement);
    });

    modalElement.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup')) {
            closePopup(modalElement);
        };
    });
};


