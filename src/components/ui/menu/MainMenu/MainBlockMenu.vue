<template>
  <div class="main-block-menu">
    <MainMenu :items="items" />
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                Главное меню                                */
/* -------------------------------------------------------------------------- */

import MainMenu from "./MainMenu.vue";

export default {
  name: "MainBlockMenu",
  components: {
    MainMenu,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /**
     * Массив с путями и заголовками
     * [
     *  {title: "Home", to: "/"},
     *  {title: "About", to: "/about"},
     * ]
     */
    items: Array,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.main-block-menu {
  .main-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    column-gap: 2.5rem;
    row-gap: 0.5rem;

    &__list {
      display: flex;
      gap: 3.7rem;
    }

    &__item {
      display: flex;
      min-height: 6rem;
    }

    &__link {
      @extend %text-medium;

      position: relative;

      @include set-flex-center(y);

      // подчеркивание
      &:after {
        @extend %background-secondary;

        content: "";
        position: absolute;
        bottom: 0;
        width: 0;
        height: 3px;

        @include set-default-duration(width);
      }

      &:hover,
      &:focus,
      &.router-link-exact-active {
        &:after {
          width: 100%;
        }
      }
    }
  }
}
</style>
