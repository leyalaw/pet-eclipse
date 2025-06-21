/* -------------------------------------------------------------------------- */
/*                    Директива для настройки анимации AOS                   */
/* -------------------------------------------------------------------------- */

/**
 * Добавление data-атрибутов aos
 * @param {HtmlElement} element - элемент
 * @param {Object | Array | String} value - настройки, могут быть:
 * - именем анимации;
 * - массивом [(delay,) name, duration];
 * - объектом {delay, name, duration, mirror, ...};
 */
export default {
  mounted(element, { value }) {
    // сокращенная запись [(delay,) name, duration]
    if (Array.isArray(value)) setAosSettingList(element, value);
    // подробная запись (все параметры)
    else if (typeof value === "object") setAosSettings(element, value);
    // одноименная запись (название анимации)
    else setAosSettings(element, { name: value });
  },
};

/**
 * Установка списка настроек aos после преобразования
 * их в объект
 * @param {HtmlElement} element - элемент
 * @param {Array} settingList - список настроек
 */
function setAosSettingList(element, settingList) {
  // если отсутствует delay, добавляем его
  if (settingList.length < 3) settingList.unshift(0);

  const [delay, name, duration] = settingList;

  setAosSettings(element, { delay, name, duration });
}

/**
 * Проверка и установка объекта настроек aos
 * @param {HTMLElement} element - элемент
 * @param {Object} settings - объект настроек
 */
function setAosSettings(element, settings) {
  if (typeof settings.name !== "string" || !settings.name.length) {
    console.error("Aos name is not found");
    return;
  }

  setAosDataAttributes(element, {
    ...settings,
    name: settings.name,
    delay: settings.delay || 0,
    duration: settings.duration || null,
  });
}

/**
 * Установка data-атрибутов aos
 * @param {HTMLElement} element - элемент
 * @param {Object} settings - объект настроек aos
 */
function setAosDataAttributes(element, settings) {
  for (const [setting, value] of Object.entries(settings)) {
    if (value === null) continue;

    const postfix = setting === "name" ? "" : `-${setting}`;
    element.setAttribute(`data-aos${postfix}`, value);
  }
}
