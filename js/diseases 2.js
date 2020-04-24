const itemsSecondary = document.querySelectorAll(`.diseases__item--secondary`);
const QUANTITY_COLUMNS = 2;
const MIN_WIDTH_WINDOW = 768;
const DESKTOP_WIDTH = 1200;
const clientWidth = document.body.clientWidth;

const quantityRows = itemsSecondary.length / QUANTITY_COLUMNS;

if (clientWidth >= MIN_WIDTH_WINDOW) {
  itemsSecondary.forEach((item, index) => {
    if (index < Math.round(quantityRows)) {
      item.style.order = index + 1;
      item.style.width = `37%`;
    } else {
      item.style.order = (index + 1) - Math.round(quantityRows);
      item.style.borderLeft = `1px solid #e6efde`;
      item.style.paddingLeft = `80px`;
      item.style.paddingRight = `0`;
      item.style.width = `30%`;
    }
  })
}
