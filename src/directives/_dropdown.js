/* -------------------------------------------------------------------------- */
/*                     Директива для управления дропдауном                    */
/* -------------------------------------------------------------------------- */

/** Data-атрибуты */
const DATA = Object.freeze({
  EXPANDED: "data-dropdown-expanded",
  HEIGHT: "data-dropdown-height",
});

/**
 * Преобразование элемента в дропдаун
 *
 * @param {HTMLElement} element - элемент, который нужно преобразовать в дропдаун
 * @param {Boolean} value.expanded - требуемое состояние дропдауна
 * @param {string|number} [value.height] - высота дропдауна
 * @param {string|number} [value.maxHeight] - максимальная высота дропдауна
 * @param {string|number} [value.duration] - время развертывания в миллисекундах
 * @param {boolean} [modifiers.scroll=false] - показывать ли полосу прокрутки
 */
export default {
  mounted(element, { modifiers, value }) {
    const { expanded, duration, height, maxHeight } = value;
    const { scroll } = modifiers;

    if (expanded === undefined) {
      console.error("expanded is not defined");
      return;
    }

    setStyleAttributes(element, { duration, scroll, maxHeight });

    /**
     * Установка data-атрибута с высотой дропдауна
     * и его состояние
     */
    const setDataAttributes = () => {
      setHeightData(element, height);
      toggleDropdown(element, expanded);
    };

    // Если высота не задана, то она переменчивая
    if (height === undefined) {
      /** Изменение высоты дропдауна при изменениях */
      const setHeightChanges = () => {
        element.style.height = "";
        setHeightData(element, height);

        const isExpanded = element.getAttribute(DATA.EXPANDED) === "true";

        if (isExpanded) toggleDropdown(element, true);
        else element.style.height = 0;
      };

      // Изменение высоты дропдауна при изменении размера окна
      window.addEventListener("resize", setHeightChanges);
      element._resizeHandler = setHeightChanges;

      // Изменение высоты дропдауна при изменении содержимого
      const mutationObserver = new MutationObserver(setHeightChanges);
      mutationObserver.observe(element, { childList: true, subtree: true });
      element._mutationHandler = mutationObserver;
    }

    setDataAttributes();
  },

  updated(element, { value }) {
    toggleDropdown(element, value.expanded);
  },

  unmounted(element) {
    if (element._resizeHandler)
      window.removeEventListener("resize", element._resizeHandler);

    if (element._mutationHandler) element._mutationHandler.disconnect();
  },
};

/**
 * Настроить аттрибуты style для дропдауна
 *
 * @param {HTMLElement} element - дропдаун
 * @param {{maxHeight?: string|number, duration?: string|number, scroll?: boolean}} options - опции
 * @param {string|number} [options.maxHeight] - максимальная высота дропдауна
 * @param {string|number} [options.duration=1s] - время развертывания
 * @param {boolean} [options.scroll=false] - показывать полосу прокрутки
 */
function setStyleAttributes(
  element,
  { maxHeight, duration = "1s", scroll = false }
) {
  element.style.overflow = "hidden";

  if (scroll) element.style.overflowY = "scroll";

  const durationStyle =
    typeof duration === "string" ? duration : `${duration}ms`;

  element.style.transition = `height ${durationStyle}`;

  if (maxHeight) element.style.maxHeight = maxHeight;
}

/**
 * Установка data-атрибута с требуемой высотой дропдауна
 * или scrollHeight
 *
 * @param {HTMLElement} element - дропдаун
 * @param {string|number} [height] - высота дропдауна
 */
function setHeightData(element, height) {
  const heightString =
    typeof height === "string"
      ? height
      : typeof height === "number"
      ? `${height}px`
      : `${element.scrollHeight}px`;

  element.setAttribute(DATA.HEIGHT, heightString);
}

/**
 * Переключение состояния дропдауна
 *
 * @param {HTMLElement} element - дропдаун
 * @param {Boolean} shouldBeExpanded - требуемое состояние дропдауна
 */

function toggleDropdown(element, shouldBeExpanded) {
  element.setAttribute(DATA.EXPANDED, shouldBeExpanded);

  element.style.height = shouldBeExpanded
    ? element.getAttribute(DATA.HEIGHT)
    : 0;
}
