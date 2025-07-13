<template>
  <article class="card">
    <!-- ссылка или div -->
    <component :is="containerElement">
      <!-- БЛОК С ИЗОБРАЖЕНИЕМ -->
      <figure class="card__image-block" :class="styleClasses.imageBlock">
        <!-- передать пропсом... -->
        <img v-if="image" :src="image" :alt="alt" :aria-hidden="!alt" />
        <!-- ...или передать через слот -->
        <slot name="image"></slot>
      </figure>

      <!-- ТЕЛО КАРТОЧКИ -->
      <div class="card__body" :class="styleClasses.body">
        <!-- пропсы -->
        <BaseTitle
          v-if="title"
          :level="titleLevel"
          class="card__title"
          :class="styleClasses.title"
        >
          {{ title }}
        </BaseTitle>
        <p v-if="text" class="card__text" :class="styleClasses.text">
          {{ text }}
        </p>
        <!-- слот -->
        <slot name="body"></slot>
      </div>
    </component>
  </article>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                  Карточка                                  */
/* -------------------------------------------------------------------------- */

// основное
import { h } from "vue";
// компоненты
import BaseTitle from "@baseComponents/BaseTitle";

const EMPTY_LINK = "javascript:void(0)";

export default {
  name: "BaseCard",
  components: {
    BaseTitle,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /**
     * Ссылка-контейнер
     * (если не указана ссылка и linkLabel,
     * то контейнером будет div)
     */
    link: {
      type: String,
      default: EMPTY_LINK,
    },
    /**
     * Aria-label ссылки-контейнера
     * (если не указана ссылка и linkLabel,
     * то контейнером будет div)
     */
    linkLabel: {
      type: String,
      default: "",
    },
    /** Ссылка на изображение */
    image: String,
    /** Альтернативный текст изображения */
    alt: String,
    /** Заголовок */
    title: String,
    /** Уровень заголовка h, без значения заголовок будет иметь тег p */
    titleLevel: Number,
    /** Текст */
    text: String,
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        imageBlock: "",
        body: "",
        title: "",
        text: "",
      }),
    },
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    /** Получить элемент-контейнер */
    containerElement() {
      const isLinkDefined = this.link !== EMPTY_LINK || this.linkLabel;

      return isLinkDefined
        ? // ссылка-контейнер
          h(
            "a",
            { href: this.link, "aria-label": this.linkLabel || null },
            this.$slots.default
          )
        : // div
          h("div", this.$slots.default);
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.card {
  position: relative;
  display: flex;
  flex-direction: column;

  &__image-block {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__body {
    position: relative;
  }
}
</style>
