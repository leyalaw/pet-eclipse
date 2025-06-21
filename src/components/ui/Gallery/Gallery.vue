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
        v-slot="{ slide: item }"
      >
        <GalleryCard :image="item.image" :title="item.title" />
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
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.gallery {
  width: 100%;
}
</style>
