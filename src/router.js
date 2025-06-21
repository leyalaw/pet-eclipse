// основное
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
// страницы
import HomePage from "@views/Home/index";
import EmptyPage from "@views/404.vue";
// изображения
import homeFooterImage from "@images/Home/before-footer.png";

/* -------------------------------------------------------------------------- */
/*                                   Роутер                                   */
/* -------------------------------------------------------------------------- */

const currentRoutes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: { footerImage: homeFooterImage },
  },
  { path: "/about", name: "about" },
  { path: "/studio", name: "studio" },
  { path: "/pricing", name: "pricing" },
  { path: "/blog", name: "blog" },
  { path: "/contacts", name: "contact-us" },
  { path: "/support", name: "support" },
  { path: "/affiliates", name: "affiliates" },
  { path: "/returns", name: "returns" },
  {
    path: "/:pathMatch(.*)*",
    name: "empty",
    component: EmptyPage,
    meta: { footerImage: null },
  },
];

// все отсутствующие страницы ведут в 404
const routes = currentRoutes.map((route) =>
  route.component
    ? route
    : {
        ...route,
        component: EmptyPage,
        meta: { footerImage: null },
      }
);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // закрытие панели меню при переходе на новую страницу
  store.dispatch("hideModals");
  // установка изображения футера
  store.dispatch("setFooterImage", to.meta.footerImage);
  window.scrollTo({
    top: 0,
  });
  next();
});

export default router;
