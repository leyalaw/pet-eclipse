<template>
  <div class="modal">
    <!-- кнопка открытия окна -->
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="modal__button modal__button--open"
      :class="styleClasses.openButton"
    >
      <slot name="open"></slot>
    </button>

    <!-- ОВЕРЛЕЙ -->
    <div
      @click.self="isOpen = false"
      class="modal__overlay"
      :class="styleClasses.overlay"
    >
      <!-- ОКНО -->
      <TransitionAppear :from="from" :fade="fade">
        <div v-if="isOpen" class="modal__content" :class="styleClasses.content">
          <!-- кнопка закрытия окна -->
          <button
            @click="isOpen = false"
            class="modal__button modal__button--close"
            :class="styleClasses.closeButton"
          >
            <slot name="close"></slot>
          </button>

          <!-- КОНТЕНТ ОКНА -->
          <slot></slot>
        </div>
      </TransitionAppear>
    </div>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                Модальное окно с кнопками открытия и закрытия               */
/* -------------------------------------------------------------------------- */

import TransitionAppear from "@transitions/TransitionAppear.vue";

export default {
  name: "BaseModal",
  components: {
    TransitionAppear,
  },
  /* ---------------------------------- Emits --------------------------------- */
  emits: ["open", "close"],
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Открыто ли окно */
    open: {
      type: Boolean,
      default: false,
    },
    /** Анимировать ли fade */
    fade: {
      type: Boolean,
      default: true,
    },
    /** Сторона появления */
    from: String,
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        overlay: "",
        content: "",
        openButton: "",
        closeButton: "",
      }),
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      isOpen: this.open,
    };
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    /** Ширина скроллбара */
    scrollWidth() {
      return `${window.innerWidth - document.documentElement.clientWidth}px`;
    },
  },
  /* ---------------------------------- Watch --------------------------------- */
  watch: {
    // изменение видимости окна извне
    open(newValue) {
      this.isOpen = newValue;
    },
    // отмена возможности скроллить при открытом окне
    isOpen(newValue) {
      if (newValue) {
        this.$emit("open");
        document.body.classList.add("modal-open");
        document.body.style.paddingRight = this.scrollWidth;
        document.body.style.overflow = "hidden";
      } else {
        this.$emit("close");
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "";
        document.body.style.overflow = "";
      }
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.modal {
  &__button {
    cursor: pointer;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
  }
}

body:not(.modal-open) .modal__overlay {
  pointer-events: none;
}
</style>
