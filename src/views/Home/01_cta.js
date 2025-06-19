import { defineComponent, computed, h } from "vue";
import { useStore } from "vuex";

/* -------------------------------------------------------------------------- */
/*                      Настройка содержимого секции CTA                      */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "CtaContent",
  setup() {
    const store = useStore();

    const designWorks = computed(
      () => store.getters.worksGrouped?.design?.works
    );

    return () => h("div", {}, JSON.stringify(designWorks.value));
  },
});
