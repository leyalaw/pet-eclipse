<template>
  <div class="tabs">
    <!-- ВКЛАДКИ -->
    <div class="tabs__headers" :class="styleClasses.headers">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        @click="activeTabId = tab.id"
        class="tabs__header"
        :class="[
          styleClasses.header,
          { [styleClasses.headerActive]: tab.id === activeTabId },
        ]"
      >
        <slot name="header" :tab="tab"></slot>
      </button>
    </div>

    <!-- КОНТЕНТ -->
    <div :class="styleClasses.content">
      <slot name="content" :tab="activeTab"></slot>
    </div>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                   Вкладки                                  */
/* -------------------------------------------------------------------------- */

export default {
  name: "BaseTabs",
  /* ---------------------------------- Emits --------------------------------- */
  emits: ["change"],
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Список вкладок */
    tabs: {
      type: Array,
      required: true,
      validator(tabs) {
        return tabs.every((tab) => tab.id);
      },
    },
    /** Id первоначально активной вкладки */
    initialTab: [String, Number],
    /** Классы элементов */
    styleClasses: {
      type: Object,
      default: () => ({
        headers: "",
        header: "",
        headerActive: "",
        content: "",
      }),
    },
  },
  /* ---------------------------------- Data --------------------------------- */
  data() {
    return {
      activeTabId: null,
    };
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    activeTab() {
      return this.tabs.find((tab) => tab.id === this.activeTabId);
    },
  },
  /* ---------------------------------- Watch --------------------------------- */
  watch: {
    activeTabId(newValue) {
      this.$emit("change", newValue);
    },
  },
  /* --------------------------------- Created -------------------------------- */
  created() {
    this.activeTabId =
      this.initialTab === undefined ? this.tabs[0].id : this.initialTab;
  },
};
</script>

<style lang="scss"></style>
