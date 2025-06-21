import dropdown from "@directives/_dropdown";
import rotate from "@directives/_rotate";
import columns from "@directives/_columns";
import aos from "@directives/_aos";

export default [
  // дропдаун
  {
    name: "dropdown",
    directive: dropdown,
  },
  // вращение блока
  {
    name: "rotate",
    directive: rotate,
  },
  // колонки
  {
    name: "columns",
    directive: columns,
  },
  {
    // анимация на скролле
    name: "aos",
    directive: aos,
  },
];
