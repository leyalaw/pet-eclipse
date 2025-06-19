// основное
import { defineComponent, h, computed } from "vue";
import { useStore } from "vuex";
// шаблоны
import HeroSectionTemplate from "@sectionTemplates/HeroSectionTemplate.vue";
import DropdownSectionTemplate from "@sectionTemplates/DropdownSectionTemplate.vue";
// контентыs
import CtaContent from "@views/Home/01_cta";
import DesignContent from "@views/Home/02_design";
import FeaturesContent from "@views/Home/03_features";
import GuidelinesContent from "@views/Home/04_guidelines";
import FinalContent from "@views/Home/05_final";
// стили
import "@viewStyles/Home/index.scss";

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
    const SECTIONS = Object.freeze([
      {
        id: "cta",
        title: "Push yourself & your designs",
        titleLevel: null,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: CtaContent,
      },
      {
        id: "design",
        title: "Latest design style",
        titleLevel: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: DesignContent,
      },
      {
        id: "features",
        title: "Features of app",
        titleLevel: 2,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: FeaturesContent,
      },
      {
        id: "guidelines",
        title: "Our design guidelines",
        titleLevel: 2,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: GuidelinesContent,
      },
      {
        id: "final",
        title: "Push yourself & your designs",
        titleLevel: null,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: FinalContent,
      },
    ]);

    const lastSectionIndex = computed(() => SECTIONS.length - 1);

    const getSectionTemplate = (index) =>
      [0, lastSectionIndex.value].includes(index)
        ? HeroSectionTemplate
        : DropdownSectionTemplate;

    return () =>
      h(
        "main",
        SECTIONS.map(({ id, title, titleLevel, text, content }, index) => {
          return h(
            getSectionTemplate(index),
            { class: `${id}-section`, title, titleLevel, info: text },
            () => h(content)
          );
        })
      );
  },
});
