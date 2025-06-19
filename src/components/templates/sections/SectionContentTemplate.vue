<template>
  <div class="section-content">
    <div class="wrapper">
      <!-- ШАПКА СЕКЦИИ -->
      <div class="section-content__header" :class="styleClasses.header">
        <!-- заголовок -->
        <component
          :is="titleTag"
          class="section-content__title"
          :class="styleClasses.title"
        >
          {{ title }}
        </component>
        <!-- текст шапки -->
        <div class="section-content__info" :class="styleClasses.info">
          {{ info }}
        </div>
      </div>

      <!-- ОСНОВНОЙ КОНТЕНТ -->
      <div class="section-content__body" :class="styleClasses.body">
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
