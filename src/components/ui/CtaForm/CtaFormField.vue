<template>
  <div class="cta-form-field">
    <!-- поле -->
    <slot></slot>

    <!-- иконка -->
    <div class="cta-form-field__icon">
      <slot name="icon"></slot>
    </div>

    <!-- сообщение об ошибке -->
    <CtaFormError
      :button-mode="buttonMode"
      :error="error"
      :message-position="errorPosition"
      :hide-message-in="hideMessageIn"
    />
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                             Блок с полем формы                             */
/* -------------------------------------------------------------------------- */

import CtaFormError from "@ui/CtaForm/CtaFormError.vue";

export default {
  name: "CtaFormField",
  components: {
    CtaFormError,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Текст ошибки */
    error: String,
    /** Позиция сообщения об ошибке */
    errorPosition: String,
    /** Сменять ли сообщение кнопкой */
    buttonMode: Boolean,
    /** Время скрытия сообщения об ошибке при buttonMode */
    hideMessageIn: Number,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.cta-form-field {
  @include set-side-icon-position(
    2.1rem,
    $from-border: $default-padding,
    $from-content: null,
    $icon-block: ".cta-form-field__icon"
  );

  &__icon {
    pointer-events: none;
  }

  svg {
    fill: map.get($colors, object, secondary);
  }
}
</style>
