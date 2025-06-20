/* -------------------------------------------------------------------------- */
/*                    Хелпер для простого получения данных                    */
/* -------------------------------------------------------------------------- */

/**
 * Получение экшена для загрузки данных
 * @param {String} arguments.url - url для получения данных
 * @param {String} arguments.commitName - название мутации
 */
export default function ({ url, commitName }) {
  return async ({ commit }) => {
    const response = await fetch(url);
    const data = await response.json();
    commit(commitName, data);
  };
}
