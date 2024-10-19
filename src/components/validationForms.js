const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-${validationConfig.errorClass}`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorActiveClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-${validationConfig.errorClass}`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  inputElement.setCustomValidity('');
  formError.textContent = "";
  formError.classList.remove(validationConfig.errorActiveClass);
};

const validateInput = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMsg);
  } else {
    inputElement.setCustomValidity("");
  }
  inputElement.validity.valid
    ? hideInputError(formElement, inputElement, validationConfig)
    : showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.buttonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      validateInput(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, validationConfig));
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.buttonInactiveClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.buttonInactiveClass);
  }
};

export const clearValidationError = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  const buttonElement = formElement.querySelector(validationConfig.buttonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
};