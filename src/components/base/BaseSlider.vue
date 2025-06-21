<template>
  <div class="slider">
    <!-- ПАГИНАЦИЯ -->
    <div
      v-if="pages"
      class="slider__page-buttons"
      :class="styleClasses.pageButtons"
    >
      <button
        v-for="pageNumber in totalPagesNumber"
        :key="pageNumber"
        @click="onPageButtonClick(pageNumber)"
        class="slider__page-button"
        :class="[
          styleClasses.pageButton,
          {
            [styleClasses.pageButtonActive]: isPageCurrent(pageNumber),
          },
        ]"
      ></button>
    </div>

    <!-- СЛАЙДЕР -->
    <div class="slider__body">
      <!-- КНОПКА "НАЗАД" -->
      <button
        v-if="buttons"
        type="button"
        @click="onScrollButtonClick('previous')"
        :disabled="isScrollButtonDisabled('previous')"
        class="slider__button slider__button--previous"
        :class="styleClasses.previousButton"
      >
        <slot name="previous-button"></slot>
      </button>

      <!-- ОСНОВНОЕ -->
      <div
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @touchmove="onTouchMove"
        class="slider__view"
        :class="styleClasses.view"
      >
        <div
          class="slider__track"
          :class="styleClasses.track"
          :style="{
            transform: `translateX(${scrollTranslation || translation}px)`,
            transition: scrollTranslation ? 'none' : null,
          }"
        >
          <div
            v-for="slide in slides"
            :key="slide.id"
            :style="{
              width: `calc(100% / ${slidesAmountToShow})`,
            }"
            ref="slide"
            class="slider__slide"
            :class="styleClasses.slide"
          >
            <slot name="slide" :slide="slide"></slot>
          </div>
        </div>
      </div>

      <!-- КНОПКА "ВПЕРЕД" -->
      <button
        v-if="buttons"
        type="button"
        @click="onScrollButtonClick('next')"
        :disabled="isScrollButtonDisabled('next')"
        class="slider__button slider__button--next"
        :class="styleClasses.nextButton"
      >
        <slot name="next-button"></slot>
      </button>
    </div>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                   Слайдер                                  */
/* -------------------------------------------------------------------------- */

import handleMediaQuery from "@helpers/handleMediaQuery";

/**
 * Проверка валидности списка количеств слайдов
 * @param {Array} mediaSlidesAmount - список количеств слайдов
 * для каждого медиа-запроса
 * [
 *   { query: '(max-width: 320px)', slides: 1 },
 *   { query: '(min-width: 768px)', slides: 2 }
 * ]
 */
const isMediaSlidesAmountValid = (mediaSlidesAmount) =>
  !mediaSlidesAmount.length ||
  mediaSlidesAmount.every((querySlidesAmount) =>
    ["query", "slides"].every((key) => key in querySlidesAmount)
  );

export default {
  name: "BaseSlider",
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Список слайдов */
    slides: {
      type: Array,
      required: true,
      validator(slides) {
        return slides.every((slide) => slide.id);
      },
    },
    /** Количество отображаемых слайдов по умолчанию */
    show: {
      type: Number,
      required: true,
    },
    /**
     * Список количеств отображаемых слайдов для каждого медиа-запроса
     * [
     *   { query: '(max-width: 320px)', slides: 1 },
     *   { query: '(min-width: 768px)', slides: 2 }
     * ]
     * (при отсутствии/несоответствии меда-запроса
     * используется значение по умолчанию)
     */
    showMedia: {
      type: Array,
      default: () => [],
      validator: isMediaSlidesAmountValid,
    },
    /** Количество скроллируемых слайдов по умолчанию */
    scroll: {
      type: Number,
      required: true,
    },
    /**
     * Список количеств скроллируемых слайдов для каждого медиа-запроса
     * [
     *   { query: '(max-width: 320px)', slides: 1 },
     *   { query: '(min-width: 768px)', slides: 2 }
     * ]
     * (при отсутствии/несоответствии меда-запроса
     * используется значение по умолчанию)
     */
    scrollMedia: {
      type: Array,
      default: () => [],
      validator: isMediaSlidesAmountValid,
    },
    /** Отображение кнопок "ВПЕРЕД" и "НАЗАД" */
    buttons: {
      type: Boolean,
      default: false,
    },
    /** Отображение пагинации */
    pages: {
      type: Boolean,
      default: false,
    },
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        pageButtons: "",
        pageButton: "",
        pageButtonActive: "",
        nextButton: "",
        previousButton: "",
        track: "",
        slide: "",
        view: "",
      }),
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      firstVisibleSlideIndex: 0,
      slideWidth: 0,
      slidesAmounts: {
        show: {
          value: this.show,
          default: this.show,
          media: this.showMedia,
        },
        scroll: {
          value: this.scroll,
          default: this.scroll,
          media: this.scrollMedia,
        },
      },
      isMouseDown: false,
      scrollStartX: 0,
      scrollTranslation: 0,
      isSwiping: false,
      swipeStart: null,
    };
  },
  /* --------------------------------- Created -------------------------------- */
  created() {
    this.setMediaQueries();
    document.addEventListener("mouseup", this.onMouseUp);
  },
  /* --------------------------------- Mounted -------------------------------- */
  mounted() {
    window.addEventListener("resize", this.setSlideWidth);
    this.setSlideWidth();
  },
  /* ------------------------------- BeforeUnmount ---------------------------- */
  beforeUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("resize", this.setSlideWidth);
  },
  /* ---------------------------------- Computed ----------------------------- */
  computed: {
    /** Смещение по X полотна со слайдами */
    translation() {
      return this.getSlideTranslation(this.firstVisibleSlideIndex);
    },
    /** Максимальное допустимое смещение полотна */
    maxTranslation() {
      return this.getSlideTranslation(this.maxFirstVisibleSlideIndex);
    },
    /** Количество скроллируемых слайдов */
    slidesAmountToScroll() {
      return this.slidesAmounts.scroll.value;
    },
    /** Количество отображаемых слайдов */
    slidesAmountToShow() {
      return this.slidesAmounts.show.value;
    },
    /** Количество полностью отображаемых слайдов на странице */
    pageSlidesAmount() {
      return Math.floor(this.slidesAmountToShow);
    },
    /** Максимальный допустимый индекс первого отображаемого слайда */
    maxFirstVisibleSlideIndex() {
      const areSlidesFewerThanShow =
        this.slides.length < this.slidesAmountToShow;

      return areSlidesFewerThanShow
        ? 0
        : this.slides.length - this.slidesAmountToShow;
    },
    /** Общее количество страниц */
    totalPagesNumber() {
      return Math.ceil(this.slides.length / this.pageSlidesAmount);
    },
    /** Номер текущей страницы */
    currentPageNumber() {
      return Math.ceil(this.firstVisibleSlideIndex / this.pageSlidesAmount + 1);
    },
  },
  watch: {
    firstVisibleSlideIndex(newValue) {
      const updateInfo = {
        activeSlides: this.slides.slice(
          newValue,
          newValue + this.slidesAmountToShow
        ),
      };

      if (this.pages) updateInfo.page = this.currentPageNumber;

      this.$emit("scroll", updateInfo);
    },
    isSwiping(newValue) {
      this.$emit(newValue ? "swipe-start" : "swipe-end");
    },
  },
  /* ---------------------------------- Methods ------------------------------- */
  methods: {
    /** Настройка медиа-запросов */
    setMediaQueries() {
      ["show", "scroll"].forEach((type) => {
        const queries = this.slidesAmounts[type].media.map(
          ({ query }) => query
        );
        handleMediaQuery(
          (mediaQuery) => this.onMediaChange(mediaQuery, type),
          ...queries
        );
      });
    },
    /**
     * Обработка изменения количества отображаемых/скроллируемых слайдов
     * @param {String} mediaQuery - подходящий медиа-запрос
     * @param {'show' | 'scroll'} type - назначение количества слайдов
     */
    onMediaChange(mediaQuery, type) {
      if (!mediaQuery) {
        this.slidesAmounts[type].value = this.slidesAmounts[type].default;
        return;
      }
      this.slidesAmounts[type].value = this.slidesAmounts[type].media.find(
        ({ query }) => query === mediaQuery
      ).slides;
    },
    /** Поиск и установка ширины слайда */
    setSlideWidth() {
      const slide = Array.isArray(this.$refs.slide)
        ? this.$refs.slide[0]
        : this.$refs.slide;

      setTimeout(() => {
        this.slideWidth = slide.clientWidth;
        this.firstVisibleSlideIndex = this.getCorrectFirstVisibleSlideIndex(
          this.firstVisibleSlideIndex
        );
      }, 0);
    },
    /** Является ли страница текущей */
    isPageCurrent(pageNumber) {
      return this.currentPageNumber === pageNumber;
    },
    /** Отключена ли кнопка прокрутки */
    isScrollButtonDisabled(buttonName) {
      const limits = {
        next: this.maxFirstVisibleSlideIndex,
        previous: 0,
      };

      return this.firstVisibleSlideIndex === limits[buttonName];
    },
    /** Обработка нажатия на кнопку прокрутки */
    onScrollButtonClick(buttonName) {
      const signs = {
        next: 1,
        previous: -1,
      };

      this.firstVisibleSlideIndex = this.getCorrectFirstVisibleSlideIndex(
        this.firstVisibleSlideIndex +
          signs[buttonName] * this.slidesAmountToScroll
      );
    },
    /** Обработка нажатия на кнопку пагинации */
    onPageButtonClick(pageNumber) {
      this.firstVisibleSlideIndex = this.getCorrectFirstVisibleSlideIndex(
        (pageNumber - 1) * this.pageSlidesAmount
      );
    },
    /** Обработка нажатия на полотно со слайдами */
    onMouseDown(event) {
      event.preventDefault();
      this.isMouseDown = true;
      this.handleScrollStart(event);
    },
    /** Обработка движения мыши с удержанием  */
    onMouseMove(event) {
      if (!this.isMouseDown) return;
      this.handleScrollMove(event);
    },
    /** Обработка отпускания мыши */
    onMouseUp(event) {
      if (!this.isMouseDown) return;
      this.isMouseDown = false;
      this.handleScrollEnd(event);
    },
    /** Обработка нажатия на полотно со слайдами */
    onTouchStart(event) {
      this.handleScrollStart(event.touches[0]);
    },
    /** Обработка движения движения пальца по экрану  */
    onTouchMove(event) {
      this.handleScrollMove(event.touches[0]);
    },
    /** Обработка отпускания пальца */
    onTouchEnd(event) {
      this.handleScrollEnd(event.touches[0]);
    },
    /** Обработка начала прокрутки */
    handleScrollStart(event) {
      // установка точки, относительно которой будет происходить смещение
      this.scrollStartX = this.translation - event.clientX;
      // установка точки, относительно которой будет происходить смещение
      this.swipeStart = { x: event.clientX, y: event.clientY };
    },
    /** Обработка движения прокрутки */
    handleScrollMove(event) {
      // динамическое смещение в пределах допустимых значений
      this.scrollTranslation = this.getCorrectTranslation(
        this.scrollStartX + event.clientX
      );

      // проверка на начало прокрутки
      if (
        !this.isSwiping &&
        (Math.abs(this.swipeStart.x - event.clientX) > 10 ||
          Math.abs(this.swipeStart.y - event.clientY) > 10)
      )
        this.isSwiping = true;
    },
    /** Обработка окончания прокрутки */
    handleScrollEnd() {
      // установка первого отображаемого слайда
      this.firstVisibleSlideIndex = this.getCorrectFirstVisibleSlideIndex(
        Math.abs(
          Math[this.translation >= this.scrollTranslation ? "floor" : "ceil"](
            this.scrollTranslation / this.slideWidth
          )
        )
      );

      this.scrollTranslation = 0;
      this.scrollStartX = 0;
      this.isSwiping = false;
      this.swipeStart = null;
    },
    /**
     * Проверка корректности индекса первого отображаемого слайда
     * @param slideIndex - индекс слайда
     */
    getCorrectFirstVisibleSlideIndex(slideIndex) {
      return slideIndex < 0
        ? 0
        : slideIndex > this.maxFirstVisibleSlideIndex
        ? this.maxFirstVisibleSlideIndex
        : slideIndex;
    },
    /**
     * Проверка корректности смещения
     * @param translation - смещение
     */
    getCorrectTranslation(translation) {
      return translation > 0
        ? 0
        : translation < this.maxTranslation
        ? this.maxTranslation
        : translation;
    },
    /**
     * Получение смещения слаида
     * @param slideIndex - индекс слайда
     */
    getSlideTranslation(slideIndex) {
      return slideIndex * this.slideWidth * -1;
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.slider {
  position: relative;
  width: 100%;

  &__view {
    overflow: hidden;
  }

  &__track {
    will-change: transform;
    display: flex;
    transition: transform 1s;
  }

  &__slide {
    flex-shrink: 0;
  }

  &__button {
    position: absolute;

    &:not(:disabled) {
      cursor: pointer;
    }

    &--previous {
      left: 0;
    }
  }

  &__page-buttons {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__page-button {
    cursor: pointer;
  }
}
</style>
