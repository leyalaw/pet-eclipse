// основное
import { defineComponent, h } from "vue";
// компоненты
import InfoCards from "@ui/InfoCards/InfoCards.vue";

/* -------------------------------------------------------------------------- */
/*                    Настройка содержимого секции Features                   */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "FeaturesContent",
  setup() {
    const FEATURES = Object.freeze([
      {
        icon: "feature-purchase",
        title: "Lorem ipsum dolor sit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      },
      {
        icon: "feature-delivery",
        title: "Ametconsectetur",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      },
      {
        icon: "feature-options",
        title: "Lorem ipsum dolor sit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      },
      {
        icon: "feature-online",
        title: "Lorem ipsum dolor sit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      },
    ]);

    // карточки
    return () =>
      h(InfoCards, {
        cards: FEATURES,
        titleLevel: 3,
        class: "features-section__cards",
      });
  },
});
