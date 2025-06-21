// основное
import { computed, defineComponent, h, ref } from "vue";
import { useStore } from "vuex";
// компоненты
import Gallery from "@ui/Gallery/Gallery.vue";

/* -------------------------------------------------------------------------- */
/*                   Настройка содержимого секции Guidelines                  */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "GuidelinesContent",
  setup() {
    const store = useStore();

    // const activeLineId = ref(null);

    const categories = computed(() => {
      const lines = store.getters.lines || [];

      return lines.map((line) => ({
        id: line.id,
        title: line.name,
      }));
    });

    // const activeWorks = computed(() => {
    //   return store.getters.getWorksByLineId(activeLineId.value);
    // });

    // галерея
    return () =>
      h(Gallery, {
        categories: categories.value,
        // categoryItems: activeWorks.value,
        // onChange: (lineId) => (activeLineId.value = lineId),
        getItems: (lineId) => store.getters.getWorksByLineId(lineId),
      });
  },
});
