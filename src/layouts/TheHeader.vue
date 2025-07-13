<template>
  <header class="header">
    <div class="wrapper">
      <nav class="header__nav">
        <!-- ЛОГО -->
        <router-link
          v-aos="[$duration.calm, 'fade', $duration.calm]"
          to="/"
          title="Home page"
          class="header__logo"
        >
          <BaseSvgIcon name="logo" />
        </router-link>

        <!-- МЕНЮ -->
        <!-- выезжающее меню -->
        <MainOverlayMenu
          v-show="isMobile"
          v-aos="[$duration.short, 'fade', $duration.calm]"
          :open="isModalMenuOpen"
          :items="menuItems"
          @slide-in="onSlideIn"
          @slide-out="onSlideOut"
        />
        <!-- обычное меню -->
        <MainBlockMenu v-show="!isMobile" :items="menuItems" />
      </nav>
    </div>
  </header>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                    Хедер                                   */
/* -------------------------------------------------------------------------- */

// основное
import { mapGetters } from "vuex";
// хелпер
import handleMediaQuery from "@helpers/handleMediaQuery";
// компоненты
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";
import MainOverlayMenu from "@ui/menu/MainMenu/MainOverlayMenu.vue";
import MainBlockMenu from "@ui/menu/MainMenu/MainBlockMenu.vue";

export default {
  name: "TheHeader",
  components: {
    BaseSvgIcon,
    MainOverlayMenu,
    MainBlockMenu,
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
      isMobile: false,
    };
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    ...mapGetters(["isModalMenuOpen"]),
  },
  /* ---------------------------------- Watch --------------------------------- */
  watch: {
    // начальное состояние выезжающего меню всегда спрятанное
    isMobile(newValue) {
      this.setModalMenuVisibility(false);
    },
  },
  /* --------------------------------- Created -------------------------------- */
  created() {
    const query = `${this.$maxWidthMq.md} and (orientation: portrait)`;

    // бургер-меню на малых экранах при портретной ориентации
    handleMediaQuery(
      (mediaQuery) => (this.isMobile = mediaQuery === query),
      query
    );
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    onSlideIn() {
      this.setModalMenuVisibility(true);
    },
    onSlideOut() {
      this.setModalMenuVisibility(false);
    },
    /** Установить статус видимости меню для проекта */
    setModalMenuVisibility(isIn) {
      this.$store.dispatch(isIn ? "showModalMenu" : "hideModalMenu");
    },
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
      fill: map.get($colors, object, secondary);

      @include make-square(6.8rem);
    }
  }
}
</style>
