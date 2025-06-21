/* -------------------------------------------------------------------------- */
/*                        Хранилище изображений футера                        */
/* -------------------------------------------------------------------------- */

export default {
  state: {
    footerImage: null,
  },

  getters: {
    footerImage: (state) => state.footerImage,
  },

  actions: {
    setFooterImage: ({ commit }, footerImage) =>
      commit("SET_FOOTER_IMAGE", footerImage),
  },

  mutations: {
    SET_FOOTER_IMAGE: (state, footerImage) => (state.footerImage = footerImage),
  },
};
