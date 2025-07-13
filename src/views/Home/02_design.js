// основное
import { defineComponent, h } from "vue";

/* -------------------------------------------------------------------------- */
/*                     Настройка содержимого секции Design                    */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "DesignContent",
  setup() {
    // "обрезанное" изображение
    return () =>
      h("img", { src: "/images/Home/design.png", alt: "", ariaHidden: true });
  },
});
