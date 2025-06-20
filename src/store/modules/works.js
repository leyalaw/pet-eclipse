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
    fetchLines: getFetchAction({
      url: "/api/lines",
      commitName: "SET_LINES",
    }),
    /** Получить работы */
    fetchWorks: getFetchAction({
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
};
