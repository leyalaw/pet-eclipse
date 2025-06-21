<template>
  <TheHeader />
  <TheFixedButtons />
  <router-view></router-view>
  <TheFooter />
</template>

<script>
import TheHeader from "@layouts/TheHeader.vue";
import TheFixedButtons from "@layouts/TheFixedButtons/TheFixedButtons.vue";
import TheFooter from "@layouts/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFixedButtons,
    TheFooter,
  },
};
</script>

<style lang="scss"></style>
