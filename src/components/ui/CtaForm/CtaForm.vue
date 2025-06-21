<template>
  <form v-if="options.length" @submit.prevent="submitForm" class="cta-form">
    <!-- МУЛЬТИСЕЛЕКТ -->
    <CtaFormField
      :button-mode="isSmallScreen"
      :error="formErrors.options"
      :error-position="isSmallScreen ? 'above' : 'below'"
      class="cta-form__field cta-form__field--select"
    >
      <BaseSelect
        v-model="formValues.options"
        :options="options"
        :trigger-text="selectText"
        :style-classes="{
          trigger: 'cta-form__select-trigger',
          list: 'cta-form__options',
          option: 'cta-form__option',
          optionSelected: 'cta-form__option--selected',
        }"
        list-height="20vh"
        multi
        @open="onOptionsOpen"
        @close="onOptionsClose"
      />
      <template #icon>
        <BaseSvgIcon
          name="arrow-circle-thin"
          v-rotate:right="{
            rotated: areOptionsShown,
            from: 'left',
            to: 'bottom',
            duration: $duration.calm,
          }"
        />
      </template>
    </CtaFormField>

    <!-- ПОЛЕ EMAIL -->
    <CtaFormField
      :button-mode="isSmallScreen"
      :error="formErrors.email"
      error-position="below"
      class="cta-form__field cta-form__field--email"
    >
      <input
        type="text"
        v-model="formValues.email"
        :placeholder="emailText"
        @blur="v$.formValues.email.$touch()"
        @input="resetError('email')"
      />
      <template #icon>
        <BaseSvgIcon name="arrow" />
      </template>
    </CtaFormField>

    <!-- КНОПКА ОТПРАВКИ -->
    <DefaultButtonTemplate
      type="submit"
      effect="brightness"
      class="cta-form__submit-button"
    >
      <BaseSvgIcon name="arrow-circle-thick" />
    </DefaultButtonTemplate>
  </form>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                  Форма CTA                                 */
/* -------------------------------------------------------------------------- */

// валидация
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
// хелперы
import handleMediaQuery from "@helpers/handleMediaQuery";
// компоненты
import CtaFormField from "./CtaFormField.vue";
import BaseSelect from "@baseComponents/BaseSelect.vue";
import BaseSvgIcon from "@baseComponents/BaseSvgIcon.vue";
import DefaultButtonTemplate from "@buttonTemplates/DefaultButtonTemplate.vue";

export default {
  name: "CtaForm",
  components: {
    CtaFormField,
    BaseSelect,
    BaseSvgIcon,
    DefaultButtonTemplate,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Опции для селекта */
    options: Array,
    /**
     * Текст селекта
     * (может быть функцией, генерирующий текст на основе выбранных значений)
     */
    selectText: [String, Function],
    /** Текст ошибки, если не выбраны опции */
    notSelectedError: {
      type: String,
      default: "Select options",
    },
    /** Текст поля email */
    emailText: String,
    /** Текст ошибки, если поле email пустое */
    emailEmptyError: {
      type: String,
      default: "Enter email",
    },
    /** Текст ошибки, если email невалиден */
    EmailWrongError: {
      type: String,
      default: "Please enter a valid email",
    },
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      formValues: {
        options: [],
        email: "",
      },
      areOptionsShown: false,
      isSmallScreen: false,
    };
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    formErrors() {
      const options = this.v$.formValues.options;
      const email = this.v$.formValues.email;

      return {
        options: options.$dirty
          ? options.required.$invalid
            ? this.notSelectedError
            : null
          : null,
        email: email.$dirty
          ? email.required.$invalid
            ? this.emailEmptyError
            : email.email.$invalid
            ? this.EmailWrongError
            : null
          : null,
      };
    },
  },
  /* ---------------------------------- Setup --------------------------------- */
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  /* --------------------------------- Created -------------------------------- */
  created() {
    handleMediaQuery(
      (mediaQuery) => (this.isSmallScreen = !!mediaQuery),
      this.$maxWidthMq.md
    );
  },
  /* ------------------------------- Validations ------------------------------ */
  validations() {
    return {
      formValues: {
        options: {
          required: (value) => value.length > 0,
        },
        email: {
          required,
          email,
        },
      },
    };
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    /** Обработка открытия селекта */
    onOptionsOpen() {
      this.areOptionsShown = true;

      //   убрать ошибку при открытии
      this.resetError("options");
    },
    /** Обработка закрытия селекта */
    onOptionsClose() {
      this.areOptionsShown = false;

      //   показать ошибку, если опции не выбраны
      this.v$.formValues.options.$touch();
    },
    /**
     * Сброс ошибки поля
     * @param {string} field - название поля
     */
    resetError(field) {
      if (this.v$.formValues[field].$dirty) this.v$.formValues[field].$reset();
    },
    /** Обработка отправки формы */
    submitForm() {
      //   сбросить все ошибки
      ["options", "email"].forEach((field) => this.resetError(field));

      this.$nextTick(() => {
        this.v$.$touch();
        if (!this.v$.$invalid) {
          console.log(`Submitted: ${JSON.stringify(this.formValues)}`);
          this.formValues.options = [];
          this.formValues.email = "";
          this.v$.$reset();
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.cta-form {
  @extend %Montserrat-regular;
  @extend %color-secondary-accent;
  @extend %text-medium;

  display: flex;
  align-items: start;
  gap: 2rem;

  @include mq(md) {
    flex-direction: column;
    gap: 1rem;
  }

  //   поля формы
  &__field {
    &--select {
      width: 28rem;
    }

    &--email {
      width: 26.5rem;
    }

    @include mq(md) {
      width: 50%;
    }
    @include mq(sm) {
      width: 70%;
    }
    @include mq(xs) {
      width: 100%;
    }
  }

  // мультиселект
  &__select-trigger,
  input {
    @extend %radius-softened;
    @extend %background-detail-additional;

    outline: none;
    width: 100%;
    border: none;
    height: 6rem;
    padding: $default-padding $default-padding * 3 $default-padding
      $default-padding;
  }

  &__option {
    @include set-default-duration(background-color color);
    @include set-responsive-property(
      calc($default-padding / 2) $default-padding,
      padding
    );

    background-color: rgba(map.get($colors, object, detail, additional), 0.7);

    &:hover {
      background-color: rgba(map.get($colors, object, detail, additional), 0.9);
    }

    &--selected {
      @extend %color-primary;

      background-color: rgba(map.get($colors, object, primary), 0.7);

      &:hover {
        background-color: rgba(map.get($colors, object, secondary), 0.9);
      }
    }
  }

  //   кнопка отправки
  &__submit-button {
    $size: 6rem;

    @extend %background-secondary;

    @include set-responsive-property($size, height);
    @include set-responsive-property($size, width);

    svg {
      @include make-square(1.8rem);
    }
  }
}
</style>
