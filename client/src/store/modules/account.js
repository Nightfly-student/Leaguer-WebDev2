import { userService } from "../../services/userService";
import router from "../../router/index";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true, isAdmin: user.isAdmin }, user }
  : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }, { email, password }) {
    commit("loginRequest", { email });
    userService.login(email, password).then(
      (user) => {
        commit("loginSuccess", user);
        router.push("/");
        setTimeout(() => {
          dispatch("alert/success", "Logged In", { root: true });
        });
      },
      (error) => {
        commit("loginFailure", error.response.data.message);
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    commit("logout");
    router.push("/login");
  },
  register({ dispatch }, user) {
    userService.register(user).then(
      () => {
        router.push("/login");
        setTimeout(() => {
          dispatch("alert/success", "Registration successful", {
            root: true,
          });
        });
      },
      (error) => {
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
  updatePassword({ dispatch }, { oldPass, newPass }) {
    userService.updatePassword(oldPass, newPass).then(
      () => {
        setTimeout(() => {
          dispatch("alert/success", "Updated Password", { root: true });
        });
      },
      (error) => {
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
  updateUsername({ dispatch }, { username }) {
    userService.updateUsername(username).then(
      () => {
        setTimeout(() => {
          dispatch("alert/success", "Updated Username", { root: true });
        });
      },
      (error) => {
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
  updateEmail({ dispatch }, { email }) {
    userService.updateMail(email).then(
      () => {
        setTimeout(() => {
          dispatch("alert/success", "Updated Email", { root: true });
        });
      },
      (error) => {
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
  deleteAccount({ dispatch, commit }) {
    userService.deleteAccount().then(
      () => {
        userService.logout();
        commit("logout");
        router.push("/");
        setTimeout(() => {
          dispatch("alert/success", "Successfully Deleted Account", {
            root: true,
          });
        });
      },
      (error) => {
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
};

const mutations = {
  loginRequest(state, payload) {
    state.status = { loggingIn: true };
    state.user = payload;
  },
  loginSuccess(state, payload) {
    state.status = { loggedIn: true, isAdmin: payload.isAdmin };
    state.user = payload;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
};
