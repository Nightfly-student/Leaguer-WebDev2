import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../assets/style.css";

import HomeView from "../views/HomeView.vue";
import SummonerView from "../views/SummonerView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import SettingsView from "../views/SettingsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import { adminRoute, userRoute } from "../helpers/auth-header";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "Home",
        metaTags: [
          {
            name: "description",
            content: "The home page of our example app.",
          },
          {
            property: "og:description",
            content: "The home page of our example app.",
          },
        ],
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        title: "Login",
        metaTags: [
          {
            name: "description",
            content: "The login page of our example app.",
          },
          {
            property: "og:description",
            content: "The login page of our example app.",
          },
        ],
      },
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
      meta: {
        title: "Register",
        metaTags: [
          {
            name: "description",
            content: "The Register page of our example app.",
          },
          {
            property: "og:description",
            content: "The Register page of our example app.",
          },
        ],
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsView,
      beforeEnter: userRoute,
      meta: {
        title: "Settings",
        metaTags: [
          {
            name: "description",
            content: "The Settings page of our example app.",
          },
          {
            property: "og:description",
            content: "The Settings page of our example app.",
          },
        ],
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: AdminDashboard,
      beforeEnter: adminRoute,
      meta: {
        title: "Dashboard",
        metaTags: [
          {
            name: "description",
            content: "The Admin page of our example app.",
          },
          {
            property: "og:description",
            content: "The Admin page of our example app.",
          },
        ],
      },
    },
    {
      path: "/summoner/:region/:summonerName",
      name: "Profile",
      component: SummonerView,
      props: true,
      meta: {
        title: "Profile",
        metaTags: [
          {
            name: "description",
            content: "The Profile page of our example app.",
          },
          {
            property: "og:description",
            content: "The Profile page of our example app.",
          },
        ],
      },
    },
    {
      name: "Page Not Found",
      path: "/:pathMatch(.*)*",
      component: PageNotFoundView,
      meta: {
        title: "Page Not Found",
        metaTags: [
          {
            name: "description",
            content: "The Page Not Found page of our example app.",
          },
          {
            property: "og:description",
            content: "The Page Not Found page of our example app.",
          },
        ],
      },
    },
    /* {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    }, */
  ],
});
router.beforeEach((to, from, next) => {
  //Metadata//
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
