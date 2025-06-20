<template>
  <BaseModalPageSection
    tag="section"
    class="hero-section"
    :style-classes="{ background: 'hero-section__background' }"
  >
    <!-- КОНТЕНТ -->
    <SectionContentTemplate
      :title="title"
      :info="info"
      class="hero-section__content"
      :style-classes="{
        header: 'hero-section__header',
        title: 'hero-section__title',
        body: 'hero-section__body',
      }"
    >
      <slot></slot>
    </SectionContentTemplate>
  </BaseModalPageSection>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                    Шаблон секции с фоновым изображением                    */
/* -------------------------------------------------------------------------- */

import BaseModalPageSection from "@baseComponents/BaseModal/BaseModalPageSection.vue";
import SectionContentTemplate from "./SectionContentTemplate.vue";

export default {
  name: "HeroSectionTemplate",
  components: {
    BaseModalPageSection,
    SectionContentTemplate,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Текст заголовка */
    title: String,
    /** Текст хедера секции */
    info: String,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.hero-section {
  &__background {
    @extend %overlay;

    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &::after {
      @extend %overlay;
      @extend %background-primary;

      content: "";
      position: absolute;
      filter: opacity(0.3) hue-rotate(345deg) saturate(1.8);
    }
  }

  &__content {
    @include set-flex-center(y, column);
    @include set-responsive-property(18.6rem 0 12rem, padding);

    @extend %color-primary;
    @extend %text-big;

    min-height: 100vh;
    line-height: 2.4rem;
  }

  &__header {
    width: 51.2rem;
    margin-bottom: 2.2rem;

    @include mq(sm) {
      width: 90%;
    }

    @include mq(xs) {
      width: 100%;
    }
  }

  &__title {
    @extend %Montserrat-bold;

    letter-spacing: -0.6px;
    margin-bottom: 3.4rem;
    font-size: 6rem;
    line-height: 5.5rem;
    text-transform: uppercase;

    @include mq(
      (
        max-width: md,
        max-height: md,
      )
    ) {
      font-size: 5rem;
    }

    @include mq(
      (
        max-width: sm,
        max-height: sm,
      )
    ) {
      font-size: 4rem;
    }
  }
}
</style>
