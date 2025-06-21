// основное
import { defineComponent, h } from "vue";
// компоненты
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

/* -------------------------------------------------------------------------- */
/*                     Настройка содержимого секции Final                     */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "FinalContent",
  setup() {
    // лого
    return () => h(BaseSvgIcon, { name: "logo" });
  },
});
