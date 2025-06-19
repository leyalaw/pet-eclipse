// основное
import { createStore } from "vuex";

/* -------------------------------------------------------------------------- */
/*                                  Хранилище                                 */
/* -------------------------------------------------------------------------- */

export default createStore({
  state: {
    lines: [],
    works: [],
  },

  getters: {
    /** направления */
    lines: (state) => state.lines,
    /** работы */
    works: (state) => state.works,
    /** группированные работы по направлениям */
    worksGrouped: (state) =>
      state.lines.reduce(
        (acc, line) => ({
          ...acc,
          [line.name]: {
            name: line.name,
            id: line.id,
            works: state.works.filter((work) => work.lineId === line.id),
          },
        }),
        {}
      ),
  },

  actions: {
    /** Получить направления */
    fetchLines: fetchActions({
      url: "/api/lines",
      commitName: "SET_LINES",
    }),
    /** Получить работы */
    fetchWorks: fetchActions({
      url: "/api/works",
      commitName: "SET_WORKS",
    }),
    /** Получить направления и работы */
    fetchWorksGrouped: ({ dispatch }) => {
      dispatch("fetchLines");
      dispatch("fetchWorks");
    },
  },

  mutations: {
    SET_LINES: (state, lines) => {
      state.lines = lines;
    },
    SET_WORKS: (state, works) => {
      state.works = works;
    },
  },
});

function fetchActions({ url, commitName }) {
  return async ({ commit }) => {
    const response = await fetch(url);
    const data = await response.json();
    commit(commitName, data);
  };
}
