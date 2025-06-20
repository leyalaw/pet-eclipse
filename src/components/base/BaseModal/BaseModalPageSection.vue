<template>
  <component :is="tag" class="modal-page-section">
    <div class="modal-page-section__background-block">
      <div
        class="modal-page-section__background"
        :class="styleClasses.background"
      ></div>
    </div>
    <slot></slot>
  </component>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*     Секция с неподвижным фоном без пустот при открытии модального окна     */
/* -------------------------------------------------------------------------- */

export default {
  name: "BaseModalPageSection",
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Тег секции */
    tag: {
      type: String,
      default: "section",
    },
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        background: "",
      }),
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.modal-page-section {
  position: relative;

  &__background-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }

  &__background {
    width: 100vw;
    height: 100%;
  }
}

body.modal-open .modal-page-section__background-block {
  width: 100vw;
}
</style>
