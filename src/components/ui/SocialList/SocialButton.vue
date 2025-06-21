<template>
  <DefaultButtonTemplate
    effect="brightness"
    class="social-button"
    :style="{ backgroundColor: color }"
  >
    <BaseSvgIcon :name="iconId" />
    {{ title }}
  </DefaultButtonTemplate>
</template>

<script>
import DefaultButtonTemplate from "@buttonTemplates/DefaultButtonTemplate.vue";
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "SocialButton",
  components: {
    DefaultButtonTemplate,
    BaseSvgIcon,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /* Иконка */
    iconId: String,
    /* Заголовок */
    title: String,
    /* Цвет */
    color: String,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.social-button {
  @include set-responsive-property(1rem 2rem);
  @include set-side-icon-position(
    1.6rem,
    "left",
    $from-border: 1.5rem,
    $from-content: 1rem
  );

  @extend %Firasans-bold;
  @extend %text-small;
}
</style>
