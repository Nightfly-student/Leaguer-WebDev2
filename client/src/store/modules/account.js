import { userService } from "../../services/userService";
import router from "../../router/index";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
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
        commit("loginFailure", error);
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    commit("logout");
    router.push("/login");
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    userService.register(user).then(
      (user) => {
        commit("registerSuccess", user);
        router.push("/login");
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      (error) => {
        commit("registerFailure", error);
        dispatch("alert/error", error.response.data.message, { root: true });
      }
    );
  },
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state) {
    state.status = {};
  },
  registerFailure(state) {
    state.status = {};
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
};