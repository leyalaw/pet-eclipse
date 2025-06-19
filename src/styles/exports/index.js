import durations from "@styles/exports/durations.module.scss";

export default {
  duration: getDurationMsNumbers(durations),
};

/**
 * Получение длительностей в миллисекундах
 *
 * @param {Object} durations - экспортированные длительности в секундах
 */
function getDurationMsNumbers(durations) {
  const durationMsNumbers = {};

  for (const [name, value] of Object.entries(durations)) {
    durationMsNumbers[name] =
      value.slice(-2) === "ms" ? parseFloat(value) : parseFloat(value) * 1000;
  }

  return durationMsNumbers;
}
