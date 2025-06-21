<template>
  <TransitionAppear fade>
    <div v-if="isShown" class="scroll-top-block">
      <DefaultButtonTemplate
        effect="opacity"
        v-bind="$attrs"
        @click="scrollToTop"
        class="scroll-top-block__button"
      >
        <BaseSvgIcon name="arrow" />
      </DefaultButtonTemplate>
    </div>
  </TransitionAppear>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                       Кнопка возврата наверх страницы                      */
/* -------------------------------------------------------------------------- */

// переходы
import TransitionAppear from "@transitions/TransitionAppear.vue";
// компоненты
import DefaultButtonTemplate from "@buttonTemplates/DefaultButtonTemplate.vue";
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "ScrollTopBlock",
  inheritAttrs: false,
  components: {
    TransitionAppear,
    DefaultButtonTemplate,
    BaseSvgIcon,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /**
     * Расстояние, которое нужно проскроллить от начала страницы,
     * чтобы кнопка отобразилась
     */
    shownFrom: {
      type: Number,
      default: 0,
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      isShown: !this.shownFrom,
    };
  },
  /* --------------------------------- Mounted -------------------------------- */
  mounted() {
    if (!this.isShown) window.addEventListener("scroll", this.setVisibility);
  },
  /* ------------------------------ BeforeUnmount ----------------------------- */
  beforeUnmount() {
    window.removeEventListener("scroll", this.setVisibility);
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    /** Установка видимости кнопки */
    setVisibility() {
      this.isShown = window.scrollY >= this.shownFrom;
    },
    /** Скролл наверх */
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.scroll-top-block {
  @extend %container;

  margin-left: 2.7rem;

  @include mq(xl) {
    margin-left: 0;
  }

  &__button {
    @include set-responsive-property(1.6rem);

    @extend %background-detail-accent;

    @include mq(xl) {
      @include sharpen-side(left);
    }

    svg {
      @include make-square(1.8rem);

      transform: rotate(-90deg);
    }
  }
}
</style>
