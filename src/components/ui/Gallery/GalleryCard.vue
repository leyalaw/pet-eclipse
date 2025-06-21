<template>
  <BaseCard :image="image" :title="title" class="gallery-card">
    <template #body>
      <BaseSvgIcon name="arrow-short" />
    </template>
  </BaseCard>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                              Карточка галереи                              */
/* -------------------------------------------------------------------------- */

import BaseCard from "@baseComponents/BaseCard.vue";
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "GalleryCard",
  components: {
    BaseCard,
    BaseSvgIcon,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /* Id */
    id: [String, Number],
    /* Изображение */
    image: String,
    /* Заголовок */
    title: String,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.gallery-card {
  @extend %pointed;

  width: 100%;
  border-radius: 0.5rem 0.5rem 1rem 1rem;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;

  .card {
    &__image-block {
      height: 20.5rem;
      overflow: hidden;

      img {
        @include set-default-duration(transform);
      }
    }

    &__body {
      @include set-responsive-property(2.5rem 6rem 2.5rem 4rem);
      @include set-side-icon-position(1.6rem, $from-border: 4rem);

      @extend %background-detail-additional;
      @extend %Montserrat-regular;

      text-align: center;

      p {
        @extend %color-secondary-accent;
        @extend %text-medium;

        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      svg {
        fill: map.get($colors, object, secondary);
      }
    }
  }

  &:hover {
    .card__image-block {
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
