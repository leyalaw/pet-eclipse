<template>
  <BaseModalPageSection
    tag="section"
    :aria-labelledby="TITLE_ID"
    class="dropdown-section"
    :style-classes="{ background: 'dropdown-section__background' }"
  >
    <!-- КНОПКА ОТКРЫТИЯ/ЗАКРЫТИЯ СЕКЦИИ -->
    <div class="dropdown-section__toggler-block">
      <RotationButtonTemplate
        v-aos="['zoom-in', $duration.short]"
        :arrow-up="!isExpanded"
        :rotation-duration="DROPDOWN_DURATION"
        :diameter="TOGGLER_DIAMETER"
        :aria-controls="DROPDOWN_ID"
        :aria-expanded="isExpanded"
        :aria-pressed="isExpanded"
        aria-label="Toggle section visibility"
        @click="onTogglerClick"
        class="dropdown-section__toggler"
      />
    </div>

    <!-- ДРОПДАУН -->
    <div
      v-dropdown="{
        expanded: isExpanded,
        duration: DROPDOWN_DURATION,
      }"
      :id="DROPDOWN_ID"
      :aria-hidden="!isExpanded"
      :style="{ minHeight: TOGGLER_DIAMETER }"
    >
      <SectionContentTemplate
        :title-level="titleLevel"
        :title="title"
        :title-id="TITLE_ID"
        :info="info"
        :style="{
          opacity: isExpanded ? 1 : 0,
        }"
        class="dropdown-section__content"
        :style-classes="{
          header: 'dropdown-section__header',
          title: 'dropdown-section__title',
          body: 'dropdown-section__body',
        }"
      >
        <slot></slot>
      </SectionContentTemplate>
    </div>
  </BaseModalPageSection>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                         Шаблон секции с дропдауном                         */
/* -------------------------------------------------------------------------- */

// стороннее
import aos from "aos";
import { v4 as uuidv4 } from "uuid";
// компоненты
import BaseModalPageSection from "@baseComponents/BaseModal/BaseModalPageSection.vue";
import RotationButtonTemplate from "@buttonTemplates/RotationButtonTemplate.vue";
import SectionContentTemplate from "./SectionContentTemplate.vue";

export default {
  name: "DropdownSectionTemplate",
  components: {
    BaseModalPageSection,
    RotationButtonTemplate,
    SectionContentTemplate,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Текст заголовка */
    title: String,
    /** Текст хедера секции */
    info: String,
    /** Уровень заголовка */
    titleLevel: Number,
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      TOGGLER_DIAMETER: "11rem",
      DROPDOWN_DURATION: this.$duration.calm,
      DROPDOWN_ID: uuidv4(),
      TITLE_ID: uuidv4(),

      isExpanded: true,
    };
  },
  /* -------------------------------- Methods --------------------------------- */
  methods: {
    onTogglerClick() {
      this.isExpanded = !this.isExpanded;
      setTimeout(() => aos.refresh(), this.DROPDOWN_DURATION);
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.dropdown-section {
  // блок кнопки открытия/закрытия секции
  &__toggler-block {
    @extend %container;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 500;
    transform: translateY(-50%);

    @include set-flex-center(x);
  }

  &__content {
    @extend %color-secondary-default;
    @extend %text-medium;

    min-height: 6.5rem;
    padding: 6.5rem 0;
    text-align: center;
    line-height: 2.5rem;
    letter-spacing: 0.1px;

    @include set-default-duration(opacity);
  }

  &__header {
    width: 60%;
    margin: 0 auto 4.8rem;

    @include mq(lg) {
      width: 80%;
      min-width: 30rem;
    }
  }

  &__title {
    @extend %color-secondary-accent;
    text-transform: uppercase;
  }

  h1 {
    @extend %GothamPro-bold;

    font-size: 4rem;
    margin: 5rem 0 2.8rem;
    line-height: 1;
  }

  h2 {
    @extend %Montserrat-bold;

    margin: 9rem 0 3rem;
    font-size: 3rem;

    @include mq(sm) {
      font-size: 2.5rem;
    }
  }

  &__body {
    @include set-flex-center(x, column);
  }
}
</style>
