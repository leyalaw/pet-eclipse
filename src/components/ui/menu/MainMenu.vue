<template>
  <div class="main-menu">
    <!-- МЕНЮ -->
    <BaseRouterMenu
      :items="items"
      class="main-menu__list"
      :style-classes="{
        item: 'main-menu__item',
        link: 'main-menu__link',
      }"
    />

    <!-- КНОПКА JOIN -->
    <DefaultButtonTemplate
      class="main-menu__join-button"
      icon="arrow-circle-thick"
      effect="brightness"
      @click="onJoinButtonClick"
    >
      Join
      <BaseSvgIcon name="arrow-circle-thick" />
    </DefaultButtonTemplate>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                Главное меню                                */
/* -------------------------------------------------------------------------- */

import BaseRouterMenu from "@baseComponents/BaseRouterMenu.vue";
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";
import DefaultButtonTemplate from "@buttonTemplates/DefaultButtonTemplate.vue";

export default {
  name: "MainMenu",
  components: {
    BaseRouterMenu,
    BaseSvgIcon,
    DefaultButtonTemplate,
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
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    onJoinButtonClick() {
      alert("Click!");
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
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
    @include set-responsive-property(6rem, min-height);

    display: flex;
  }

  // меню
  &__link {
    @extend %GothamPro-bold;
    @extend %color-primary;
    @extend %text-medium;

    @include set-flex-center(y);

    position: relative;
    text-transform: uppercase;

    // подчеркивание
    &:after {
      @extend %background-secondary;
      @include set-default-duration(width);

      content: "";
      position: absolute;
      bottom: 0;
      width: 0;
      height: 3px;
    }

    &:hover,
    &:focus,
    &.router-link-exact-active {
      &:after {
        width: 100%;
      }
    }

    &.router-link-exact-active {
      cursor: default;
    }
  }

  // кнопка Join
  &__join-button {
    @include set-responsive-property(1.8rem 3.8rem);
    @include set-side-icon-position(1.6rem);

    @extend %background-primary;
    @extend %GothamPro-bold;
    @extend %text-big;

    align-self: center;
  }
}
</style>
