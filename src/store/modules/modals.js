/* -------------------------------------------------------------------------- */
/*                          Хранилище модальных окон                          */
/* -------------------------------------------------------------------------- */

/** Имена модальных окон */
const MODAL = Object.freeze({
  MAIN_MENU: "mainMenu",
});

export default {
  /* ---------------------------------- State --------------------------------- */
  state: {
    shownModals: [],
  },

  /* --------------------------------- Getters -------------------------------- */
  getters: {
    /** Есть ли открытые модальные окна */
    isThereModal: (state) => !!state.shownModals.length,
    /** Открыто ли модальное окно с меню */
    isModalMenuOpen: (state) => state.shownModals.includes(MODAL.MAIN_MENU),
  },

  /* --------------------------------- Actions -------------------------------- */
  actions: {
    /** Спрятать все модальные окна */
    hideModals: ({ commit }) => commit("HIDE_MODALS"),
    /** Показать модальное окно с меню */
    showModalMenu: ({ commit }) =>
      commit("SET_MODAL_STATUS", {
        modal: MODAL.MAIN_MENU,
        isOpen: true,
      }),
    /** Скрыть модальное окно с меню */
    hideModalMenu: ({ commit }) =>
      commit("SET_MODAL_STATUS", {
        modal: MODAL.MAIN_MENU,
        isOpen: false,
      }),
  },

  /* -------------------------------- Mutations ------------------------------- */
  mutations: {
    HIDE_MODALS: (state) => (state.shownModals = []),
    SET_MODAL_STATUS: (state, { modal, isOpen }) => {
      if (isOpen) {
        if (!state.shownModals.includes(modal)) state.shownModals.push(modal);
      } else {
        state.shownModals = state.shownModals.filter(
          (shownModal) => shownModal !== modal
        );
      }
    },
  },
};
