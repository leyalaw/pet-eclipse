<template>
  <TheHeader />
  <router-view></router-view>
</template>

<script>
import TheHeader from "@layouts/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss"></style>
