<template>
  <BaseModal
    :open="open"
    from="right"
    @open="$emit('slide-in')"
    @close="$emit('slide-out')"
    class="main-overlay-menu"
    :style-classes="{
      overlay: 'main-overlay-menu__overlay',
      content: 'main-overlay-menu__content',
      openButton: 'main-overlay-menu__button--open',
      closeButton: 'main-overlay-menu__button--close',
    }"
  >
    <!-- кнопка открытия меню (на малых экранах) -->
    <template #open>&#9776;</template>
    <!-- кнопка закрытия меню (на малых экранах) -->
    <template #close>&times;</template>

    <MainMenu :items="items" />
  </BaseModal>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                Главное меню                                */
/* -------------------------------------------------------------------------- */

import BaseModal from "@baseComponents/BaseModal/BaseModal.vue";
import MainMenu from "./MainMenu.vue";

export default {
  name: "MainOverlayMenu",
  components: {
    BaseModal,
    MainMenu,
  },
  /* ---------------------------------- Emits --------------------------------- */
  emits: ["slide-in", "slide-out"],
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
    /** Раскрыто ли меню */
    open: Boolean,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.main-overlay-menu {
  // выезающая панель
  &__button {
    &--open,
    &--close {
      @extend %color-primary;

      display: inline-block;
      background-color: transparent;
      border: none;
    }

    &--open {
      font-size: 4.8rem;
    }

    &--close {
      font-family: serif;
      font-size: 8rem;
      font-weight: 900;
    }
  }

  &__content {
    @extend %overlay;

    position: absolute;
    padding: 2.5rem;
    text-align: right;
    background-color: darken(
      rgba(map.get($colors, object, secondary), 0.9),
      30%
    );
  }

  // меню
  .main-menu {
    &__list {
      margin-bottom: 2rem;
      text-align: left;
    }

    &__item {
      border-bottom: 1px solid map.get($colors, text, primary);
      padding: 2rem 0;
    }

    &__link {
      @extend %text-big;

      &:hover,
      &:focus,
      &.router-link-exact-active {
        color: map.get($colors, object, secondary);
      }
    }
  }
}
</style>
