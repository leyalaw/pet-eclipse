<template>
  <nav class="social-list">
    <!-- КНОПКИ СОЦИАЛЬНЫХ СЕТЕЙ -->
    <SocialButton
      v-for="(button, index) in socials"
      :key="button.id"
      v-aos="{
        name: 'fade',
        delay: $duration.short * index,
        duration: $duration.long,
        offset: 0,
      }"
      v-bind="button"
    />
  </nav>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                               Социальные сети                              */
/* -------------------------------------------------------------------------- */

import SocialButton from "./SocialButton.vue";

export default {
  name: "SocialList",
  components: {
    SocialButton,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Список для генерации кнопок социальных сетей */
    socials: {
      type: Array,
      required: true,
      validator(socials) {
        return socials.every((social) =>
          ["id", "iconId", "title", "color"].every((key) => key in social)
        );
      },
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.social-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}
</style>
