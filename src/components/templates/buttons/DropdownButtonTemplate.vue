<template>
  <button type="button" class="dropdown-button">
    <BaseSvgIcon
      name="arrow-circle-thin"
      v-rotate:right.clockwise="{
        rotated: arrowUp,
        from: 'bottom',
        to: 'top',
        duration: rotationDuration,
      }"
    />
  </button>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                   Круглая кнопка с вращающейся стрелкой                   */
/* -------------------------------------------------------------------------- */

import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "DropdownButtonTemplate",
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
  },
};
</script>

<style lang="scss">
.dropdown-button {
  /* ---------------------------------- Style --------------------------------- */
  $action-background: rgba(#000, 0.1);
  $size: 11rem;

  @extend %radius-round;
  @include make-square($size);

  position: relative;
  display: flex;
  flex-direction: column;
  border: none;
  -webkit-tap-highlight-color: rgba(#000, 0);

  // верхний и нижний полукруги
  &:before,
  &:after {
    @include set-default-duration(background-color);

    content: "";
    height: 50%;
    width: 100%;
    border-radius: $size;
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

    @include make-square($size);

    position: absolute;
    top: $center;
    left: $center;
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
