<template>
  <button
    type="button"
    class="rotation-button"
    :style="{ '--diameter': diameter }"
  >
    <BaseSvgIcon
      v-rotate:right.clockwise="{
        rotated: arrowUp,
        from: 'bottom',
        to: 'top',
        duration: rotationDuration,
      }"
      name="arrow-circle-thin"
    />
  </button>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                   Круглая кнопка с вращающейся стрелкой                   */
/* -------------------------------------------------------------------------- */

import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "RotationButtonTemplate",
  components: {
    BaseSvgIcon,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Смотрит ли стрелка вверх */
    arrowUp: {
      type: Boolean,
      default: false,
    },
    /** Скорость поворота стрелки */
    rotationDuration: {
      type: Number,
      default: 500,
    },
    /** Размер кнопки */
    diameter: {
      type: String,
      default: "10rem",
    },
  },
};
</script>

<style lang="scss">
.rotation-button {
  /* ---------------------------------- Style --------------------------------- */
  $action-background: rgba(#000, 0.1);

  @extend %radius-round;

  position: relative;
  display: flex;
  flex-direction: column;
  border: none;
  -webkit-tap-highlight-color: rgba(#000, 0);

  @include make-square(var(--diameter));

  // верхний и нижний полукруги
  &:before,
  &:after {
    content: "";
    height: 50%;
    width: 100%;
    border-radius: var(--diameter);

    @include set-default-duration(background-color);
  }

  // верхний полукруг
  &:before {
    @include sharpen-side(bottom);
  }

  // нижний полукруг
  &:after {
    @include sharpen-side(top);
  }

  // стрелка
  svg {
    $size: 30%;
    $center: get-center($size);

    position: absolute;
    top: $center;
    left: $center;

    @include make-square($size);
  }

  &:active {
    svg {
      fill: map.get($colors, text, primary);
    }

    &:before,
    &:after {
      background-color: $action-background;
    }
  }

  @include mq(
    (
      hover: hover,
      pointer: fine,
    )
  ) {
    &:hover {
      svg {
        fill: map.get($colors, text, primary);
      }

      &:before,
      &:after {
        background-color: $action-background;
      }
    }
  }
}
</style>
