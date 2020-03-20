const btnMobileElement = document.querySelector(`.about-product__toggle`);
const btmModalClose = document.querySelector(`.modal__close`);
const formElement = document.querySelector(`.about-product__form`);
const overlayElement = document.querySelector(`.overlay`);

btnMobileElement.addEventListener(`click`, () => {
  formElement.classList.add(`modal__show`);
  overlayElement.classList.add(`overlay__show`)
});

btmModalClose.addEventListener(`click`, () => {
  closeModal();
})

overlayElement.addEventListener(`click`, () => {
  closeModal();
})


const closeModal = () => {
  formElement.classList.remove(`modal__show`);
  overlayElement.classList.remove(`overlay__show`);
};
