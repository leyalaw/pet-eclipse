<template>
  <DefaultButtonTemplate
    effect="brightness"
    :aria-label="label"
    class="social-button"
    :style="{ backgroundColor: color }"
    @click="onClick"
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
    /* Aria-label */
    label: String,
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    onClick() {
      alert(`Click: ${this.title}`);
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.social-button {
  @extend %Firasans-bold;
  @extend %text-small;

  @include set-responsive-property(1rem 2rem);
  @include set-side-icon-position(
    1.6rem,
    "left",
    $from-border: 1.5rem,
    $from-content: 1rem
  );
}
</style>
