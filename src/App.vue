<template>
  <div>
    <BaseSvgIcon name="logo" />
    <router-view></router-view>
  </div>
</template>

<script>
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";

export default {
  name: "App",
  components: {
    BaseSvgIcon,
  },
};
</script>

<style lang="scss"></style>
