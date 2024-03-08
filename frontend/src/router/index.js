import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "login",

    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },

  {
    path: "/about",
    name: "about",

    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/services",
    name: "services",
    component: () => import("../views/ServicesView.vue"),
  },
  {
    path: "/service/:id",
    name: "service",
    component: () => import("../views/ServiceView.vue"),
  },
  {
    path: "/bookings",
    name: "bookings",
    component: () => import("../views/BookingsView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/UsersView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
