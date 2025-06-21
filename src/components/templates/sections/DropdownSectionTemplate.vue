<template>
  <BaseModalPageSection
    tag="section"
    class="dropdown-section"
    :style-classes="{ background: 'dropdown-section__background' }"
  >
    <!-- КНОПКА ОТКРЫТИЯ/ЗАКРЫТИЯ СЕКЦИИ -->
    <div class="dropdown-section__toggler-block">
      <DropdownButtonTemplate
        :arrow-up="!isExpanded"
        :rotation-duration="dropdownDuration"
        @click="onTogglerClick"
        class="dropdown-section__toggler"
      />
    </div>

    <!-- ДРОПДАУН -->
    <div
      v-dropdown="{
        expanded: isExpanded,
        duration: dropdownDuration,
      }"
      style="min-height: 11rem"
    >
      <SectionContentTemplate
        :title-level="titleLevel"
        :title="title"
        :info="info"
        style="transition: opacity 1s"
        :style="{ opacity: isExpanded ? 1 : 0 }"
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

// компоненты
import BaseModalPageSection from "@baseComponents/BaseModal/BaseModalPageSection.vue";
import DropdownButtonTemplate from "@buttonTemplates/DropdownButtonTemplate.vue";
import SectionContentTemplate from "./SectionContentTemplate.vue";

export default {
  name: "DropdownSectionTemplate",
  components: {
    BaseModalPageSection,
    DropdownButtonTemplate,
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
      dropdownDuration: this.$duration.calm,
      isExpanded: true,
    };
  },
  /* -------------------------------- Methods --------------------------------- */
  methods: {
    onTogglerClick() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.dropdown-section {
  // блок кнопки открытия/закрытия секции
  &__toggler-block {
    @include set-flex-center(x);

    @extend %container;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 500;

    transform: translateY(-50%);
  }

  &__content {
    @extend %color-secondary-default;
    @extend %text-medium;

    min-height: 6.5rem;
    padding: 6.5rem 0;
    text-align: center;
    line-height: 2.5rem;
    letter-spacing: 0.1px;
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
