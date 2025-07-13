<template>
  <div class="section-content">
    <div class="wrapper">
      <!-- ШАПКА СЕКЦИИ -->
      <div class="section-content__header" :class="styleClasses.header">
        <!-- заголовок -->
        <component
          :is="titleTag"
          v-aos="['fade', $duration.long]"
          :id="titleId ?? null"
          class="section-content__title"
          :class="styleClasses.title"
        >
          {{ title }}
        </component>
        <!-- текст шапки -->
        <div
          v-aos="[$duration.short, 'fade', $duration.calm]"
          class="section-content__info"
          :class="styleClasses.info"
        >
          {{ info }}
        </div>
      </div>

      <!-- ОСНОВНОЙ КОНТЕНТ -->
      <div
        v-aos="[$duration.short, 'fade-up', $duration.calm]"
        class="section-content__body"
        :class="styleClasses.body"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                           Шаблон контента секции                           */
/* -------------------------------------------------------------------------- */

export default {
  name: "SectionContentTemplate",
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Текст заголовка */
    title: String,
    /** Id заголовка */
    titleId: [String, Number],
    /** Уровень заголовка h, без значения заголовок будет иметь тег p */
    titleLevel: Number,
    /** Текст хедера секции */
    info: String,
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        header: "",
        title: "",
        info: "",
        body: "",
      }),
    },
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    /** Тег заголовка */
    titleTag() {
      if (
        Number.isInteger(this.titleLevel) &&
        this.titleLevel >= 1 &&
        this.titleLevel <= 6
      )
        return `h${this.titleLevel}`;

      return "p";
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.section-content {
  @extend %GothamPro-regular;

  position: relative;
}
</style>
