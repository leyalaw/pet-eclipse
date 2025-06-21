/* -------------------------------------------------------------------------- */
/*                      Директива для организации колонок                     */
/* -------------------------------------------------------------------------- */

/**
 * Установка колонок в соответствии с желаемым количеством элементов
 * в столбце
 * @param {HTMLElement} element - блок с колонками
 * @param {Number} value - желаемое максимальное количество
 * элементов в столбце
 */
export default (element, { value }) => {
  if (!value || !element.children.length) return;

  addExtraItems(element, value);
  setColumnCount(element, value);
};

/**
 * Добавление пустых элементов
 * @param {HTMLElement} element - блок с колонками
 * @param {Number} columnItemsAmount - желаемое максимальное количество
 * элементов в столбце
 */
function addExtraItems(element, columnItemsAmount) {
  const extraItemsAmount = element.children.length % columnItemsAmount;
  const itemTagName = element.children[0].tagName;

  const extraItem = document.createElement(itemTagName);
  extraItem.htmlContent = "&nbsp;";
  extraItem.style.display = "inline-block";

  let index = 0;
  while (index < extraItemsAmount) {
    element.appendChild(extraItem);
    index++;
  }
}

/**
 * Установка свойства column-count
 * @param {HTMLElement} element - блок с колонками
 * @param {Number} columnItemsAmount - желаемое максимальное количество
 * элементов в столбце
 */
function setColumnCount(element, columnItemsAmount) {
  element.style.columnCount = Math.ceil(
    element.children.length / columnItemsAmount
  );
}
