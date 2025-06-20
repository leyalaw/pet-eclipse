// основное
import { createStore } from "vuex";
// модули
import modals from "./modules/modals";
import works from "./modules/works";

/* -------------------------------------------------------------------------- */
/*                               Общее хранилище                              */
/* -------------------------------------------------------------------------- */

export default createStore({
  modules: {
    works,
    modals,
  },
});
