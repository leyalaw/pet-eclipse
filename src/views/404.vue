<template>
  <HeroSectionTemplate
    title="404"
    info="Sorry, there is nothing here."
    class="empty-page"
  ></HeroSectionTemplate>
</template>

<script>
import HeroSectionTemplate from "@sectionTemplates/HeroSectionTemplate.vue";

export default {
  name: "404",
  components: {
    HeroSectionTemplate,
  },
};
</script>

<style>
.empty-page {
  .hero-section__background {
    background-image: url(@images/empty/background.avif);
  }
}
</style>
