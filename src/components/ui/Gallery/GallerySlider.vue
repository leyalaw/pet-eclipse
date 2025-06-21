<template>
  <BaseSlider
    :slides="slides"
    :show="slidesToShow.default"
    :show-media="slidesToShow.media"
    :scroll="slidesToScroll"
    class="gallery-slider"
    :style-classes="{
      pageButtons: 'gallery-slider__page-buttons',
      pageButton: 'gallery-slider__page-button',
      pageButtonActive: 'gallery-slider__page-button--active',
      nextButton:
        'gallery-slider__scroll-button gallery-slider__scroll-button--next',
      previousButton:
        'gallery-slider__scroll-button gallery-slider__scroll-button--previous',
      track: 'gallery-slider__track',
      slide: 'gallery-slider__slide',
    }"
  >
    <template #previous-button>
      <BaseSvgIcon name="arrow-short" />
    </template>
    <template #next-button>
      <BaseSvgIcon name="arrow-short" />
    </template>
    <template #slide="{ slide }">
      <slot :slide="slide"></slot>
    </template>
  </BaseSlider>
</template>

<script>
import BaseSlider from "@baseComponents/BaseSlider.vue";
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "GallerySlider",
  components: {
    BaseSlider,
    BaseSvgIcon,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Список слайдов */
    slides: Array,
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      slidesToShow: Object.freeze({
        default: 3,
        media: [
          {
            query: this.$maxWidthMq.sm,
            slides: 1.5,
          },
          {
            query: this.$maxWidthMq.md,
            slides: 2.5,
          },
        ],
      }),
      slidesToScroll: 3,
    };
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.gallery-slider {
  $gap: 2rem;
  $details-color: map.get($colors, text, secondary, additional);
  $details-color-active: map.get($colors, object, secondary);

  padding-bottom: 3rem;

  // слайдер
  &__track {
    @include set-default-duration(transform);

    margin: 0 calc(#{$gap} / 2 * -1);
  }

  &__slide {
    padding: 0 calc(#{$gap} / 2);
  }

  &__scroll-button {
    $size: 1.6rem;

    @include make-square($size);

    border: none;
    background: none;
    top: get-center($size);

    &[disabled] {
      opacity: 0;
    }

    @include mq(md) {
      opacity: 0;
    }

    svg {
      @include make-square($size);
      fill: $details-color;
      opacity: 0.5;

      &:hover {
        opacity: 1;
        fill: $details-color-active;
      }
    }

    &--previous {
      left: calc(#{$gap} * -1.5);
      transform: rotate(180deg);
    }

    &--next {
      right: calc(#{$gap} * -1.5);
    }
  }

  &__page-buttons {
    bottom: 0;
    display: flex;
    gap: 0.5rem;
  }

  &__page-button {
    height: 0.5rem;
    width: 1.5rem;
    background: $details-color;
    opacity: 0.5;
    border: none;

    &--active {
      background-color: $details-color-active;
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
