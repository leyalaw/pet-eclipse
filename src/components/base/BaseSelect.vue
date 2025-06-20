<template>
  <div ref="select" class="select">
    <!-- Поле селекта -->
    <input
      type="text"
      :value="triggerText(modelValue)"
      @click="toggleOptionsList"
      readonly
      class="select__trigger"
      :class="styleClasses.trigger"
    />

    <!-- Дропдаун -->
    <ul
      v-dropdown.scroll="{
        expanded: isOptionsListOpen,
        maxHeight: listHeight,
      }"
      class="select__options"
      :class="styleClasses.list"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="select__option"
        :class="[
          styleClasses.option,
          isOptionSelected(option) && styleClasses.optionSelected,
        ]"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                   Селект                                   */
/* -------------------------------------------------------------------------- */

export default {
  name: "BaseSelect",
  /* ---------------------------------- Emits --------------------------------- */
  emits: ["update:modelValue", "open", "close"],
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Список опций (каждая опция должна содержать value и label) */
    options: {
      type: Array,
      required: true,
      validator(options) {
        return options.every((option) =>
          ["value", "label"].every((key) => key in option)
        );
      },
    },
    /** Включение режима множественного выбора */
    multi: {
      type: Boolean,
      default: false,
    },
    /** Текст в поле селекта */
    triggerText: {
      type: [Function, String],
      default: (selected) => {
        if (Array.isArray(selected))
          return selected.length
            ? `Selected: ${selected.length}`
            : "Select options";

        return selected?.label || "Select option";
      },
    },
    /** Максимальная высота развернутого списка опций */
    listHeight: String,
    /** Значение селекта */
    modelValue: [Array, Object],
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        trigger: "",
        list: "",
        option: "",
        optionSelected: "",
      }),
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      isOptionsListOpen: false,
    };
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    /** Выбранные опции или пустое значение в зависимости от multi */
    selected() {
      return this.modelValue || (this.multi ? [] : {});
    },
    /** Список выбранных опции, даже если multi === false */
    selectedList() {
      return Array.isArray(this.selected) ? this.selected : [this.selected];
    },
    /** Список значений выбранных опции, даже если multi === false */
    selectedValuesList() {
      return this.selectedList.map((option) => option.value);
    },
  },
  /* --------------------------------- Mounted -------------------------------- */
  mounted() {
    document.addEventListener("click", this.onDocumentClick);
  },
  /* ------------------------------- BeforeUnmount ---------------------------- */
  beforeUnmount() {
    document.removeEventListener("click", this.onDocumentClick);
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    /** Обработчик клика за пределами компонента */
    onDocumentClick(event) {
      if (!this.isOptionsListOpen) return;

      const isClickInsideComponent = this.$refs.select.contains(event.target);

      if (!isClickInsideComponent) this.toggleOptionsList(false);
    },
    /**
     * Выбрана ли опция
     * @param option - опция
     */
    isOptionSelected(option) {
      return this.selectedValuesList.includes(option.value);
    },
    /** Переключение состояния дропдауна */
    toggleOptionsList(shouldBeExpanded) {
      this.isOptionsListOpen =
        typeof shouldBeExpanded === "boolean"
          ? shouldBeExpanded
          : !this.isOptionsListOpen;

      this.$emit(this.isOptionsListOpen ? "open" : "close");
    },
    /** Выбор опции */
    selectOption(option) {
      const newModelValue = this.isOptionSelected(option)
        ? this.selectedList.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        : this.multi
        ? [...this.selectedList, option]
        : option;

      this.$emit("update:modelValue", newModelValue);
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.select {
  width: 100%;
  position: relative;

  &__trigger,
  &__options,
  &__option {
    cursor: pointer;
  }

  &__trigger {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__options {
    z-index: 100;
    position: absolute;
    width: 100%;
    overflow-y: scroll;
    transition-property: max-height;
  }
}
</style>
