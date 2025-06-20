// основное
import { defineComponent, h } from "vue";
// изображения
import designImage from "@images/Home/design.png";

/* -------------------------------------------------------------------------- */
/*                     Настройка содержимого секции Design                    */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "DesignContent",
  setup() {
    // "обрезанное" изображение
    return () => h("img", { src: designImage, alt: "" });
  },
});
