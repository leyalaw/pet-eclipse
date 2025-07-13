<template>
  <TheHeader />
  <TheFixedButtons />
  <router-view></router-view>
  <TheFooter />
</template>

<script>
// стороннее
import AOS from "aos";
// константы
import { MIN_AOS_HEIGHT } from "@constants";
// компоненты
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
  mounted() {
    AOS.init({
      once: true,
    });
  },
};
</script>

<style lang="scss"></style>
