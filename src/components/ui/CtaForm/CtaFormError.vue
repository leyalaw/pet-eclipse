<template>
  <TransitionAppear :from="errorTransitionFrom[messagePosition]">
    <!-- Сообщение об ошибке (при buttonMode временное) -->
    <div
      v-if="error && isMessageShown"
      class="cta-form-error-block"
      :class="`cta-form-error-block--${messagePosition}`"
    >
      <DefaultButtonTemplate
        effect="opacity"
        @click="() => setMessageVisibility(false)"
        :disabled="!buttonMode"
        class="cta-form-error cta-form-error--message"
      >
        {{ error }}
      </DefaultButtonTemplate>
    </div>

    <!-- Кнопка показа сообщения об ошибке при buttonMode -->
    <div
      v-else-if="error"
      class="cta-form-error-block cta-form-error-block--right"
    >
      <DefaultButtonTemplate
        effect="opacity"
        @click="() => setMessageVisibility(true)"
        class="cta-form-error cta-form-error--button"
      >
        !
      </DefaultButtonTemplate>
    </div>
  </TransitionAppear>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                         Сообщение об ошибке в поле                         */
/* -------------------------------------------------------------------------- */

// переходы
import TransitionAppear from "@transitions/TransitionAppear.vue";
// компоненты
import DefaultButtonTemplate from "@buttonTemplates/DefaultButtonTemplate.vue";

const POSITION = Object.freeze({
  ABOVE: "above",
  BELOW: "below",
});

const positions = Object.freeze(Object.values(POSITION));

const errorTransitionFrom = Object.freeze({
  [POSITION.ABOVE]: "bottom",
  [POSITION.BELOW]: "top",
});

export default {
  name: "CtaFormError",
  components: {
    TransitionAppear,
    DefaultButtonTemplate,
  },
  /* --------------------------------- Ptrops --------------------------------- */
  props: {
    /** Текст ошибки */
    error: String,
    /** Положение сообщения относительно поля (выше/ниже) */
    messagePosition: {
      type: String,
      default: POSITION.BELOW,
      validator(messagePosition) {
        return positions.includes(messagePosition);
      },
    },
    /** Режим кнопки (временное сообщение об ошибке) */
    buttonMode: {
      type: Boolean,
      default: false,
    },
    /** Время показа сообщения об ошибке (при buttonMode) */
    hideMessageIn: {
      type: Number,
      default: 3000,
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      POSITION,
      positions,
      errorTransitionFrom,

      isMessageShown: false,
      buttonModeTimeout: null,
    };
  },
  /* ---------------------------------- Watch --------------------------------- */
  watch: {
    error(newValue) {
      if (newValue) this.setMessageVisibility(true);
    },
    buttonMode() {
      this.setMessageVisibility(true);
    },
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    /** Показать/скрыть сообщение об ошибке
     * @param {boolean} shouldBeShown - нужно ли показать
     */
    setMessageVisibility(shouldBeShown) {
      this.isMessageShown = false;

      if (shouldBeShown) {
        this.$nextTick(() => {
          this.isMessageShown = true;

          //   установить таймаут
          this.setButtonModeTimeout();
        });
      }
    },
    /**
     * Установить таймаут показа сообщения об ошибке при buttonMode
     */
    setButtonModeTimeout() {
      if (this.buttonModeTimeout) clearTimeout(this.buttonModeTimeout);

      if (!this.buttonMode) return;

      this.buttonModeTimeout = setTimeout(() => {
        this.isMessageShown = false;
      }, this.hideMessageIn);
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.cta-form-error-block {
  $position: calc(100% + 0.5rem);

  position: absolute;
  z-index: 100;

  &--above,
  &--below {
    width: 100%;
  }

  &--above {
    bottom: $position;
  }

  &--below {
    top: $position;
  }

  &--right {
    @include set-flex-center(y);

    top: 0;
    height: 100%;
    left: $position;
  }
}

.cta-form-error {
  @extend %background-detail-accent;
  @extend %color-primary;

  width: 100%;

  &--message {
    padding: calc($default-padding / 2) $default-padding;
  }

  &--button {
    @include make-square(3.5rem);
    @extend %radius-round;

    font-size: 2rem;
  }
}
</style>
