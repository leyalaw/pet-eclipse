<template>
  <Transition
    :name="name"
    appear
    :style="{
      '--appear-duration': `${duration}ms`,
      '--appear-distance': distance,
    }"
  >
    <slot></slot>
  </Transition>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                            Переход slide и fade                            */
/* -------------------------------------------------------------------------- */

export const SIDE = Object.freeze({
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
});

export const sides = Object.values(SIDE);

export default {
  name: "TransitionAppear",
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** С какой стороны анимировать slide */
    from: {
      type: String,
      validator(side) {
        return sides.includes(side);
      },
    },
    /** Длительность анимации */
    duration: {
      type: Number,
      default: 1000,
    },
    /** Расстояние анимации */
    distance: {
      type: String,
      default: "100%",
    },
    /** Анимировать ли fade */
    fade: {
      type: Boolean,
      default: true,
    },
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    /** Имя перехода */
    name() {
      const fromPart = this.from ? `-from-${this.from}` : "";
      const fadePart = this.fade ? "-fade" : "";

      return `appear${fromPart}${fadePart}`;
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
$directions: (
  "left": (
    "axis": "X",
    "sign": -1,
  ),
  "right": (
    "axis": "X",
    "sign": 1,
  ),
  "top": (
    "axis": "Y",
    "sign": -1,
  ),
  "bottom": (
    "axis": "Y",
    "sign": 1,
  ),
);

// генерация классов
@each $direction, $data in $directions {
  .appear-from-#{$direction}-enter-active,
  .appear-from-#{$direction}-fade-enter-active,
  .appear-fade-enter-active,
  .appear-from-#{$direction}-leave-active,
  .appear-from-#{$direction}-fade-leave-active,
  .appear-fade-leave-active {
    transition-duration: var(--appear-duration);
  }

  .appear-from-#{$direction}-enter-active,
  .appear-from-#{$direction}-leave-active {
    transition-property: transform;
  }

  .appear-fade-enter-active,
  .appear-fade-leave-active {
    transition-property: opacity;
  }

  .appear-from-#{$direction}-fade-enter-active,
  .appear-from-#{$direction}-fade-leave-active {
    transition-property: transform, opacity;
  }

  .appear-from-#{$direction}-enter-from,
  .appear-from-#{$direction}-fade-enter-from,
  .appear-from-#{$direction}-leave-to,
  .appear-from-#{$direction}-fade-leave-to {
    transform: translate#{map.get($data, "axis")
      }(calc(var(--appear-distance) * #{map.get($data, "sign")}));
  }

  .appear-from-#{$direction}-fade-enter-from,
  .appear-from-#{$direction}-fade-leave-to,
  .appear-fade-enter-from,
  .appear-fade-leave-to {
    opacity: 0;
  }
}
</style>
