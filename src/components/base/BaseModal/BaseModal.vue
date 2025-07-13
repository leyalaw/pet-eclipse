<template>
  <div class="modal">
    <!-- кнопка открытия окна -->
    <button
      v-if="!isDialogOpen"
      type="button"
      aria-haspopup="true"
      :aria-controls="DIALOG_ID"
      :aria-expanded="isDialogOpen"
      :aria-label="openLabel"
      @click="openDialog"
      class="modal__button modal__button--open"
      :class="styleClasses.openButton"
    >
      <slot name="open"></slot>
    </button>

    <!-- ОВЕРЛЕЙ -->
    <teleport to="body">
      <div
        @click.self="closeDialog"
        class="modal__overlay"
        :class="styleClasses.overlay"
      >
        <!-- ОКНО -->
        <TransitionAppear :from="from" :fade="fade">
          <div
            v-if="isDialogOpen"
            :id="DIALOG_ID"
            ref="dialog"
            role="dialog"
            aria-modal="true"
            @keydown.esc="closeDialog"
            class="modal__dialog"
            :class="styleClasses.dialog"
          >
            <!-- КОНТЕНТ ОКНА -->
            <slot></slot>

            <!-- кнопка закрытия окна -->
            <button
              ref="closeButton"
              type="button"
              :aria-label="closeLabel"
              @click="closeDialog"
              class="modal__button modal__button--close"
              :class="styleClasses.closeButton"
            >
              <slot name="close"></slot>
            </button>
          </div>
        </TransitionAppear>
      </div>
    </teleport>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                Модальное окно с кнопками открытия и закрытия               */
/* -------------------------------------------------------------------------- */

// стороннее
import { v4 as uuidv4 } from "uuid";
// переходы
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
    /** Aria-label кнопки открытия */
    openLabel: {
      type: String,
      default: "Open modal",
    },
    /** Фокус при открытии окна */
    openFocus: String,
    /** Фокус при закрытии окна */
    closeFocus: String,
    /** Aria-label кнопки закрытия */
    closeLabel: {
      type: String,
      default: "Close modal",
    },
    styleClasses: {
      type: Object,
      default: () => ({
        overlay: "",
        dialog: "",
        openButton: "",
        closeButton: "",
      }),
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      DIALOG_ID: uuidv4(),
      APP_ROOT: document.getElementById("app"),

      isDialogOpen: this.open,
      firstDialogFocus: null,
    };
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    /** Ширина скроллбара */
    scrollbarWidth() {
      return `${window.innerWidth - document.documentElement.clientWidth}px`;
    },
    /** Стили body при открытом окне */
    openModalBodyStyles() {
      return {
        overflow: "hidden",
        paddingRight: this.scrollbarWidth,
      };
    },
  },
  /* ---------------------------------- Watch --------------------------------- */
  watch: {
    // изменение видимости окна извне
    open(newValue) {
      this.isDialogOpen = newValue;
    },
    // обработка изменения видимости окна
    isDialogOpen(newValue) {
      this.setDocumentBody(newValue);
      this.setAppRoot(newValue);
      this.$nextTick(() => {
        this.setFocus(newValue);
        this.setFocusTrap();
      });

      this.$emit(newValue ? "open" : "close");
    },
    // установка focus trap
    firstDialogFocus(newValue, oldValue) {
      const trapStart = newValue ?? oldValue;
      const trapEnd = this.$refs.closeButton;
      const method = newValue ? "addEventListener" : "removeEventListener";

      trapStart[method]("keydown", this.onFirstFocusKeydown);
      trapEnd[method]("keydown", this.onLastFocusKeydown);
    },
  },
  methods: {
    onFirstFocusKeydown(event) {
      if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault();
        this.$refs.closeButton.focus();
      }
    },
    onLastFocusKeydown(event) {
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        this.firstDialogFocus.focus();
      }
    },
    /** Открытие окна */
    openDialog() {
      this.isDialogOpen = true;
    },
    /** Закрытие окна */
    closeDialog() {
      this.isDialogOpen = false;
    },
    /**
     * Установка стилей body при изменении видимости окна
     * @param {boolean} isDialogOpen - открыто ли окно
     */
    setDocumentBody(isDialogOpen) {
      document.body.classList.toggle("modal-open", isDialogOpen);

      for (const [styleName, value] of Object.entries(
        this.openModalBodyStyles
      )) {
        document.body.style[styleName] = isDialogOpen ? value : "";
      }
    },
    /**
     * Установка атрибута inert при изменении видимости окна
     * @param {boolean} isDialogOpen - открыто ли окно
     */
    setAppRoot(isDialogOpen) {
      const method = isDialogOpen ? "setAttribute" : "removeAttribute";
      this.APP_ROOT[method]("inert", "");
    },
    /**
     * Установка фокуса при изменении видимости окна
     * @param isDialogOpen - открыто ли окно
     */
    setFocus(isDialogOpen) {
      const [area, prop] = isDialogOpen
        ? [this.$refs.dialog, this.openFocus]
        : [document, this.closeFocus];

      const focusElement = area.querySelector(prop);

      if (!focusElement) console.error("Focus element is not found");

      focusElement.focus();

      this.firstDialogFocus = isDialogOpen ? focusElement : null;
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

  &__dialog {
    display: flex;
    flex-direction: column;
  }

  &__button--close {
    align-self: flex-end;
    order: -1;
  }
}

body:not(.modal-open) .modal__overlay {
  pointer-events: none;
}
</style>
