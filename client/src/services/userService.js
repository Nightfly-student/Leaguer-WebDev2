import axios from "../helpers/axios-auth";

export const userService = {
  login,
  logout,
  register,
};

function login(email, password) {
  return axios
    .post("/api/users/login", {
      email: email,
      password: password,
    })
    .then((user) => {
      if (user.data.token) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user.data;
    });
}
function logout() {
  localStorage.removeItem("user");
}
function register(user) {
  return axios.post("/api/users/register", user);
}
