// основное
import { defineComponent, h, computed } from "vue";
import { useStore } from "vuex";
// компоненты
import CtaContent from "@views/home/01_cta";
import DesignContent from "@views/home/02_design";
import FeaturesContent from "@views/home/03_features";
import GuidelinesContent from "@views/home/04_guidelines";
import FinalContent from "@views/home/05_final";

/* -------------------------------------------------------------------------- */
/*                              Домашняя страница                             */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "HomePage",
  setup() {
    const store = useStore();

    // загружаем работы и категории
    if (!Object.keys(store.getters.worksGrouped).length)
      store.dispatch("fetchWorksGrouped");

    /** Данные секций страницы */
    const SECTIONS = computed(() => [
      {
        id: "cta",
        title: "Push yourself & your designs",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: CtaContent,
      },
      {
        id: "design",
        title: "Latest design style",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: DesignContent,
      },
      {
        id: "features",
        title: "Features of app",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: FeaturesContent,
      },
      {
        id: "guidelines",
        title: "Our design guidelines",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: GuidelinesContent,
      },
      {
        id: "final",
        title: "Push yourself & your designs",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: FinalContent,
      },
    ]);

    return () =>
      h(
        "main",
        SECTIONS.value.map(({ id, title, text, content }) => {
          return h("section", { class: `${id}-section` }, [
            h("h2", title),
            h("p", text),
            h(content),
          ]);
        })
      );
  },
});
