import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import directives from "@directives/index";
import styleVars from "@styles/exports/index";
import "./styles/index.scss";

const app = createApp(App);

// подключение кастомных директив
for (const directive of directives) {
  app.directive(directive.name, directive.directive);
}

// импорт некоторых стилей
for (const [name, value] of Object.entries(styleVars)) {
  app.config.globalProperties[`$${name}`] = value;
}

app.use(router).use(store).mount("#app");
