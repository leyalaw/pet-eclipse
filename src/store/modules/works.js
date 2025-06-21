import getFetchAction from "@helpers/getFetchAction";

/* -------------------------------------------------------------------------- */
/*                       Хранилище работ и их категорий                       */
/* -------------------------------------------------------------------------- */

export default {
  state: {
    lines: [],
    works: [],
  },

  getters: {
    /** направления */
    lines: (state) => state.lines,
    /** работы */
    works: (state) => state.works,
    /** работы по id направления */
    getWorksByLineId: (state, getters) => (lineId) =>
      getters.works.filter((work) => work.lineId === lineId),
  },

  actions: {
    /** Получить направления */
    fetchLines: getFetchAction({
      url: "/api/lines",
      commitName: "SET_LINES",
    }),
    /** Получить работы */
    fetchWorks: getFetchAction({
      url: "/api/works",
      commitName: "SET_WORKS",
    }),
    /** Проверить наличие направлений и работ */
    ensureLinesAndWorks: ({ dispatch, getters }) => {
      if (getters.lines.length === 0) dispatch("fetchLines");
      if (getters.works.length === 0) dispatch("fetchWorks");
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
};
