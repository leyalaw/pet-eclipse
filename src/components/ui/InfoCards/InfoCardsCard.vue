<template>
  <BaseCard
    :key="icon"
    :title="title"
    :text="text"
    v-aos="['zoom-in', $duration.calm]"
    class="info-card"
    :style-classes="{
      imageBlock: 'info-card__image-block',
      title: 'info-card__title',
    }"
  >
    <template #image>
      <BaseSvgIcon :name="icon" />
    </template>
  </BaseCard>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                           Информационная карточка                          */
/* -------------------------------------------------------------------------- */

import BaseCard from "@baseComponents/BaseCard.vue";
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "InfoCardsCard",
  components: {
    BaseCard,
    BaseSvgIcon,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Id svg */
    icon: String,
    /** Заголовок */
    title: String,
    /** Текст */
    text: String,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.info-card {
  text-align: center;

  &__image-block {
    @include make-square(13.7rem);
    @extend %radius-round;
    @extend %background-primary;

    margin: 0 auto 3.2rem;

    @include mq(md) {
      @include make-square(12rem);
    }

    svg {
      @include make-square(5rem);

      fill: map.get($colors, text, primary);
    }
  }

  &__title {
    @extend %GothamPro-bold;
    @extend %color-secondary-accent;
    @extend %text-biggest;

    margin-bottom: 2rem;
    line-height: 2.9rem;
    text-transform: uppercase;
  }
}
</style>
