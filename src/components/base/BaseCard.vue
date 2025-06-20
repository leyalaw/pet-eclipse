<template>
  <div class="card">
    <!-- БЛОК С ИЗОБРАЖЕНИЕМ -->
    <div class="card__image-block" :class="styleClasses.imageBlock">
      <!-- передать пропсом... -->
      <img v-if="image" :src="image" :alt="alt" />
      <!-- ...или передать через слот -->
      <slot name="image"></slot>
    </div>

    <!-- ТЕЛО КАРТОЧКИ -->
    <div class="card__body" :class="styleClasses.body">
      <!-- пропсы -->
      <p v-if="title" class="card__title" :class="styleClasses.title">
        {{ title }}
      </p>
      <p v-if="text" class="card__text" :class="styleClasses.text">
        {{ text }}
      </p>
      <!-- слот -->
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                  Карточка                                  */
/* -------------------------------------------------------------------------- */

export default {
  name: "BaseCard",
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Ссылка на изображение */
    image: String,
    /** Альтернативный текст изображения */
    alt: String,
    /** Заголовок */
    title: String,
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
