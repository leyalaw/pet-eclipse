<template>
  <svg class="svg-icon">
    <use :xlink:href="svgId" />
  </svg>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                   Компонент загрузки svg из спрайта по id                  */
/* -------------------------------------------------------------------------- */
// Спрайт должен быть на странице

export default {
  name: "BaseSvgIcon",
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Id svg */
    name: {
      type: String,
      required: true,
    },
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    /** Id с добавленным при необходимости хэшем */
    svgId() {
      const hasHash = Array.from(this.name)[0] === "#";
      return hasHash ? this.name : `#${this.name}`;
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.svg-icon {
  fill: currentColor;
}
</style>
