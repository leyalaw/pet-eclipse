// основное
import { createRouter, createWebHistory } from "vue-router";
// страницы
import HomePage from "@views/Home.vue";
import EmptyPage from "@views/404.vue";

/* -------------------------------------------------------------------------- */
/*                                   Роутер                                   */
/* -------------------------------------------------------------------------- */

const currentRoutes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/about", name: "about" },
  { path: "/studio", name: "studio" },
  { path: "/pricing", name: "pricing" },
  { path: "/blog", name: "blog" },
  { path: "/contacts", name: "contact-us" },
  { path: "/support", name: "support" },
  { path: "/affiliates", name: "affiliates" },
  { path: "/returns", name: "returns" },
  { path: "/:pathMatch(.*)*", name: "empty", component: EmptyPage },
];

// все отсутствующие страницы ведут в 404
const routes = currentRoutes.map(route =>
  route.component
    ? route
    : {
        ...route,
        component: EmptyPage,
      }
);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
