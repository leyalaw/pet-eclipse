<template>
  <div class="fixed-buttons">
    <!-- блок кнопки "наверх" -->
    <ScrollTopBlock :shown-from="200" />

    <!-- разделитель на случай отсутствия одного из блоков -->
    <div class="fixed-buttons__divider"></div>

    <!-- блок кнопки обратной связи (уезжает при открытии модалки) -->
    <FeedbackBlock :hidden="$store.getters.isThereModal">
      Contact Us
    </FeedbackBlock>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                     Зафиксированный оверлей с кнопками                     */
/* -------------------------------------------------------------------------- */

import ScrollTopBlock from "./ScrollTopBlock.vue";
import FeedbackBlock from "./FeedbackBlock.vue";

export default {
  name: "TheFixedButtons",
  components: {
    ScrollTopBlock,
    FeedbackBlock,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.fixed-buttons {
  @extend %overlay;
  @extend %GothamPro-bold;
  @extend %color-primary;
  @extend %text-big;
  @extend %container;

  position: fixed;
  justify-content: space-between;
  z-index: 500;

  @include set-flex-center(y);
  @include set-default-duration(margin);

  .fixed-buttons__divider {
    pointer-events: none;
  }
}
</style>
