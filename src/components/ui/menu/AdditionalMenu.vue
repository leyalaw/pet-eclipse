<template>
  <BaseRouterMenu
    :items="items"
    v-columns="inColumns"
    class="additional-menu"
  />
</template>

<script>
import BaseRouterMenu from "@baseComponents/BaseRouterMenu.vue";

export default {
  name: "AdditionalMenu",
  components: {
    BaseRouterMenu,
  },
  props: {
    items: Array,
    /** Количество элементов в столбце */
    inColumns: Number,
  },
};
</script>

<style lang="scss">
.additional-menu {
  column-gap: 5rem;

  a:hover {
    color: map.get($colors, object, secondary);
  }
}
</style>
