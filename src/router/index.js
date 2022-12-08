import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/tables",
    },
    {
      path: "/tables",
      name: "tables",
      component: () => import("../views/TablesView.vue"),
    },
    {
      path: "/order/:id",
      name: "order",
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/payment/:id",
      name: "payment",
      component: () => import("../views/PaymentView.vue"),
    },
  ],
});

export default router;
