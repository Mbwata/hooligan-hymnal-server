import NProgress from "nprogress";
import store from "@/store";
export default [
  {
    path: "/rosters",
    name: "all-rosters",
    component: () => import("@/views/rosters/Index.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      store.dispatch("fetchRosters").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/rosters/create",
    name: "create-roster",
    component: () => import("@/views/rosters/create.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      store.dispatch("fetchPlayers").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/rosters/:id",
    name: "view-roster",
    component: () => import("@/views/rosters/_id.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      const { id } = to.params;
      NProgress.start();
      store.dispatch("fetchRoster", id).then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/rosters/:id/edit",
    name: "edit-roster",
    component: () => import('@/views/rosters/edit.vue'),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      const { id } = to.params;
      NProgress.start();
      store.dispatch("fetchRoster", id).then(() => {
        store.dispatch("fetchPlayers").then(() => {
          NProgress.done();
          next();
        });
      });
    }
  }
];
