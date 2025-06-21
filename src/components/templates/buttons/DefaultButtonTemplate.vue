<template>
  <button
    :type="type"
    class="default-button"
    :class="`default-button--${effect}`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "DefaultButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    effect: {
      type: String,
      validator(value) {
        return ["brightness", "opacity"].includes(value);
      },
    },
  },
};
</script>

<style lang="scss">
.default-button {
  $text-color: map.get($colors, text, primary);

  @extend %radius-rounded;

  outline: none;
  border: none;
  color: $text-color;

  @include set-flex-center();
  @include set-default-duration(filter);

  &--brightness {
    filter: brightness(1);

    &:hover:not(:disabled) {
      filter: brightness(1.2);
    }
  }

  &--opacity {
    filter: opacity(0.8);

    &:hover:not(:disabled) {
      filter: opacity(1);
    }
  }
}
</style>
