<template>
  <GalleryTabs
    v-if="categories.length"
    :categories="categories"
    :get-items="getItems"
    v-slot="{ items: activeItems }"
    @change="onCategoryChange"
    class="gallery"
  >
    <TransitionAppear :duration="$duration.short" fade>
      <GallerySlider
        v-if="activeItems.length && !isCategoryChanging"
        :slides="activeItems"
        @swipe-start="isSwiping = true"
        v-slot="{ slide: item }"
      >
        <GalleryCard v-bind="item" @click="onItemClick(item)" />
      </GallerySlider>
    </TransitionAppear>
  </GalleryTabs>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                   Галерея                                  */
/* -------------------------------------------------------------------------- */

// переходы
import TransitionAppear from "@transitions/TransitionAppear.vue";
// компоненты
import GalleryTabs from "./GalleryTabs.vue";
import GallerySlider from "./GallerySlider.vue";
import GalleryCard from "./GalleryCard.vue";

export default {
  name: "Gallery",
  components: {
    TransitionAppear,
    GalleryTabs,
    GallerySlider,
    GalleryCard,
  },
  /* ---------------------------------- Emits --------------------------------- */
  emits: ["change"],
  /* ---------------------------------- Props --------------------------------- */
  props: {
    categories: Array,
    getItems: Function,
  },
  /* ---------------------------------- Data --------------------------------- */
  data() {
    return {
      isCategoryChanging: false,
      isSwiping: false,
    };
  },
  /* ---------------------------------- Methods ------------------------------ */
  methods: {
    onCategoryChange() {
      this.$emit("change");

      // смена категории заново активирует TransitionAppear
      this.isCategoryChanging = true;
      this.$nextTick(() => {
        this.isCategoryChanging = false;
      });
    },
    onItemClick(item) {
      if (this.isSwiping) {
        this.isSwiping = false;
        return;
      }

      console.log(`Clicked: ${item.title}`);
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.gallery {
  width: 100%;
}
</style>
