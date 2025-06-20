<template>
  <header class="header">
    <div class="wrapper">
      <nav class="header__nav">
        <!-- ЛОГО -->
        <router-link to="/" class="header__logo">
          <BaseSvgIcon name="logo" />
        </router-link>

        <!-- МЕНЮ -->
        <MainMenu :items="menuItems" />
      </nav>
    </div>
  </header>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                    Хедер                                   */
/* -------------------------------------------------------------------------- */

import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";
import MainMenu from "@ui/menu/MainMenu.vue";

export default {
  name: "TheHeader",
  components: {
    BaseSvgIcon,
    MainMenu,
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      menuItems: [
        { to: "/about", title: "About" },
        { to: "/studio", title: "Studio" },
        { to: "/pricing", title: "Pricing" },
        { to: "/blog", title: "Blog" },
      ],
    };
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.header {
  position: absolute;
  z-index: 1000;
  width: 100%;
  top: 7.4rem;

  @include mq(
    (
      max-height: md,
    )
  ) {
    top: 4rem;
  }

  @include mq(
    (
      max-height: sm,
    )
  ) {
    top: 3rem;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6rem;
  }

  &__logo {
    svg {
      @include make-square(6.8rem);
      fill: map.get($colors, object, secondary);
    }
  }
}
</style>
