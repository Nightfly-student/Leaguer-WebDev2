import { store } from "../store/index";
import router from "../router/index";

export function authHeader() {
  var user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
export function getId() {
  var user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return user._id;
  }
}
export function userRoute() {
  if (store.state.account.user === null) {
    router.push("/login");
  }
}
export function adminRoute() {
  var user = JSON.parse(localStorage.getItem("user"));
  if (!user.isAdmin) {
    router.push("/");
  }
}
