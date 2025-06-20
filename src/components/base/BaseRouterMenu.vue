<template>
  <ul class="router-menu">
    <li v-for="item in items" :key="item.to" :class="styleClasses.item">
      <router-link :to="item.to" :class="styleClasses.link">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                             Меню в router-link                             */
/* -------------------------------------------------------------------------- */

export default {
  name: "BaseRouterMenu",
  /* ---------------------------------- Pros ---------------------------------- */
  props: {
    /**
     * Массив с путями и заголовками
     * [
     *  {title: "Home", to: "/"},
     *  {title: "About", to: "/about"},
     * ]
     */
    items: {
      type: Array,
      required: true,
      validator(items) {
        const hasRequiredKeys = (menuItem) =>
          ["title", "to"].every((key) => key in menuItem);

        return items.every(hasRequiredKeys);
      },
    },
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        item: "",
        link: "",
      }),
    },
  },
};
</script>
