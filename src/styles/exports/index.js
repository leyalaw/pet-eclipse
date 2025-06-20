import durations from "@styles/exports/durations.module.scss";
import breakpoints from "@styles/exports/breakpoints.module.scss";

export default {
  duration: getDurationMsNumbers(durations),
  maxWidthMq: getMaxWidthQueries(breakpoints),
};

/**
 * Получение длительностей в миллисекундах
 *
 * @param {Object} durations - длительности в секундах
 */
function getDurationMsNumbers(durations) {
  const durationMsNumbers = {};

  for (const [name, value] of Object.entries(durations)) {
    durationMsNumbers[name] =
      value.slice(-2) === "ms" ? parseFloat(value) : parseFloat(value) * 1000;
  }

  return durationMsNumbers;
}

/**
 * Получение условий медиа-запросов для максимальных ширин
 *
 * @param {Object} breakpoints - брейкпоинты
 */
function getMaxWidthQueries(breakpoints) {
  const widthQueries = {};

  for (const [name, value] of Object.entries(breakpoints)) {
    widthQueries[name] = `(max-width: ${value})`;
  }

  return widthQueries;
}
