/* -------------------------------------------------------------------------- */
/*                          Обработка медиа-запросов                          */
/* -------------------------------------------------------------------------- */

/**
 * Запуск функции при изменении статуса соответствия размера экрана 
 * условиям медиа-запросов
 * @param {Function} handler - функция, вызываемая при изменении
 * @param  {...String} mediaQueries - медиа-запросы
 */
export default function (handler, ...mediaQueries) {
  let matchedQuery;

  const matchesInfo = mediaQueries.map(query => window.matchMedia(query));

  matchesInfo.forEach(watchMatchChange);

  /**
   * Установка слежения за изменением статуса соответствия размера экрана
   * условиям медиа-запросов
   * @param {MediaQueryList} matchInfo - информация о соответствии
   */
  function watchMatchChange(matchInfo) {
    matchInfo.addEventListener("change", onMatchChange);
    onMatchChange();
  }

  /** 
   * Обработка изменения статуса соответствия размера экрана 
   * условиям медиа-запросов 
   */
  function onMatchChange() {
    let isQueryMatched = false;

    for (const matchInfo of matchesInfo) {
      if (matchInfo.matches) {
        if (matchedQuery !== matchInfo.media) handler(matchInfo.media);

        matchedQuery = matchInfo.media;
        isQueryMatched = true;

        break;
      }
    }

    if (!isQueryMatched && matchedQuery !== null) {
      matchedQuery = null;
      handler(matchedQuery);
    }
  }
}

