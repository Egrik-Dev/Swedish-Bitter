const btnForm = document.querySelectorAll(`.btn`);
const formElement = document.querySelector(`.about-product__form`);
const tabletFormElement = document.querySelector(`.modal-form`);
const btmModalClose = document.querySelectorAll(`.modal__close`);
const overlayElement = document.querySelector(`.overlay`);
const ESC_KEYCODE = 27;
const TABLET_WIDTH_WINDOW = 768;

btmModalClose.forEach((btnClose) => {
  btnClose.addEventListener(`click`, () => {
    closeModal();
  })
})

overlayElement.addEventListener(`click`, () => {
  closeModal();
})

btnForm.forEach((button) => {
  if (button.dataset.btn === `form`) {
    button.addEventListener(`click`, () => {
      if (clientWidth < TABLET_WIDTH_WINDOW) {
        formElement.classList.add(`modal__show`);
      } else {
        tabletFormElement.classList.add(`modal__show`);
      }

      overlayElement.classList.add(`overlay__show`);
      document.addEventListener(`keydown`, setEscKeydown);
    })
  }
})

const setEscKeydown = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    document.removeEventListener(`keydown`, setEscKeydown)
    closeModal();
  }
}

const closeModal = () => {
  if (clientWidth < TABLET_WIDTH_WINDOW) {
    formElement.classList.remove(`modal__show`);
  } else {
    tabletFormElement.classList.remove(`modal__show`);
  }

  overlayElement.classList.remove(`overlay__show`);
};
