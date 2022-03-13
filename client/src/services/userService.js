import { authHeader, getId } from "../helpers/auth-header";
import axios from "../helpers/axios-auth";

export const userService = {
  login,
  logout,
  register,
  updatePassword,
  deleteAccount,
  updateUsername,
  updateMail,
};
function login(email, password) {
  return axios
    .post("/api/users/login", {
      email: email,
      password: password,
    })
    .then((user) => {
      if (user.data.token) {
        localStorage.setItem("user", JSON.stringify(user.data));
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

function updatePassword(oldPass, newPass) {
  return axios.put(
    `/api/users/${getId()}/password`,
    { oldPass: oldPass, newPass: newPass },
    { headers: authHeader() }
  );
}

function updateUsername(username) {
  return axios.put(
    `/api/users/${getId()}/username`,
    { name: username },
    { headers: authHeader() }
  );
}

function updateMail(email) {
  return axios.put(
    `/api/users/${getId()}/email`,
    { email: email },
    { headers: authHeader() }
  );
}

function deleteAccount() {
  return axios.delete(`api/users/${getId()}`, { headers: authHeader() });
}
