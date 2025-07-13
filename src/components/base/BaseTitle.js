import { h } from "vue";

const BaseTitle = (props, context) => {
  return h(props.level ? `h${props.level}` : "p", context.slots.default());
};

BaseTitle.props = {
  level: {
    type: Number,
    validator: (level) => {
      return Number.isInteger(level) && level > 0 && level < 7;
    },
  },
};

export default BaseTitle;
