<template>
  <div class="feedback-block">
    <TransitionAppear :fade="false" from="bottom">
      <div v-if="!hidden">
        <DefaultButtonTemplate
          :effect="effect"
          v-bind="$attrs"
          @click="onClick"
          class="feedback-block__button"
        >
          <slot></slot>
        </DefaultButtonTemplate>
      </div>
    </TransitionAppear>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                          Кнопка для обратной связи                         */
/* -------------------------------------------------------------------------- */

// хелперы
import handleMediaQuery from "@helpers/handleMediaQuery";
// переходы
import TransitionAppear from "@transitions/TransitionAppear.vue";
// компоненты
import DefaultButtonTemplate from "@buttonTemplates/DefaultButtonTemplate.vue";

export default {
  name: "FeedbackBlock",
  inheritAttrs: false,
  components: {
    TransitionAppear,
    DefaultButtonTemplate,
  },
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      effect: "brightness",
    };
  },
  /* --------------------------------- Created -------------------------------- */
  created() {
    // на малых экранах меняется hover эффект для удобства
    handleMediaQuery(
      (mediaQuery) => (this.effect = mediaQuery ? "opacity" : "brightness"),
      this.$maxWidthMq.md
    );
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    /** Клик! */
    onClick() {
      alert("Click!");
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.feedback-block {
  @extend %container;

  transform-origin: bottom right;
  transform: translateY(-180%) rotate(-90deg);

  &__button {
    @include set-responsive-property(2rem 4rem);
    @include sharpen-side(bottom);

    @extend %background-primary;

    max-width: 20rem;
    word-break: break-all;
  }
}
</style>
