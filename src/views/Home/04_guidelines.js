import { computed, defineComponent, h } from "vue";
import { useStore } from "vuex";

/* -------------------------------------------------------------------------- */
/*                   Настройка содержимого секции Guidelines                  */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "GuidelinesContent",
  setup() {
    const store = useStore();

    const worksGrouped = computed(() => store.getters.worksGrouped);

    return () => h("div", {}, JSON.stringify(worksGrouped.value));
  },
});
