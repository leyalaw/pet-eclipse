<template>
  <BaseTabs
    :tabs="categories"
    @change="$emit('change', $event)"
    class="gallery-tabs"
    :style-classes="{
      headers: 'gallery-tabs__headers',
      header: 'gallery-tabs__header',
      headerActive: 'gallery-tabs__header--active',
    }"
  >
    <template #header="{ tab: category }">
      {{ category.title }}
    </template>
    <template #content="{ tab: category }">
      <slot :items="getItems(category.id)"></slot>
    </template>
  </BaseTabs>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                               Вкладки галереи                              */
/* -------------------------------------------------------------------------- */

import BaseTabs from "@baseComponents/BaseTabs.vue";

export default {
  name: "GalleryTabs",
  components: {
    BaseTabs,
  },
  /* ---------------------------------- Emits --------------------------------- */
  emits: ["change"],
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Список вкладок */
    categories: {
      type: Array,
      required: true,
      validator(categories) {
        return categories.every((category) => category.id);
      },
    },
    getItems: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */

.gallery-tabs {
  &__headers {
    @extend %radius-softened;

    display: inline-flex;
    flex-wrap: nowrap;
    border: 1px solid map.get($colors, object, secondary);
    margin-bottom: 4.5rem;
    overflow: hidden;

    @include mq(md) {
      max-width: 90%;
      flex-wrap: wrap;
    }
    @include mq(xs) {
      flex-direction: column;
    }
  }

  &__header {
    @extend %pointed;
    @extend %GothamPro-bold;
    @extend %text-medium;

    border: none;
    background-color: transparent;
    display: inline-block;
    color: map.get($colors, object, secondary);
    text-transform: uppercase;

    @include set-responsive-property(2rem 3.5rem);
    @include set-default-duration(background-color color);

    @include mq(md) {
      width: 50%;
    }
    @include mq(xs) {
      width: 100%;
    }

    &:hover,
    &.gallery-tabs__header--active {
      @extend %background-secondary;
      @extend %color-primary;
    }
  }
}
</style>
