// основное
import { defineComponent, computed, h } from "vue";
import { useStore } from "vuex";
// компоненты
import CtaForm from "@ui/CtaForm/CtaForm.vue";

/* -------------------------------------------------------------------------- */
/*                      Настройка содержимого секции CTA                      */
/* -------------------------------------------------------------------------- */

export default defineComponent({
  name: "CtaContent",
  setup() {
    const store = useStore();

    const designOptions = computed(() => {
      const designWorks = store.getters.worksGrouped?.design?.works || [];

      return designWorks.map((work) => ({
        label: work.title,
        value: work.id,
      }));
    });

    const getSelectText = (selected) =>
      selected?.length ? `Selected: ${selected.length}` : "Design Style";

    // форма заявки
    return () =>
      h(CtaForm, {
        options: designOptions.value,
        selectText: getSelectText,
        notSelectedError: "Please select at least one option",
        emailText: "Email",
        emailEmptyError: "Email is required",
        EmailWrongError: "Please enter a valid email",
      });
  },
});
