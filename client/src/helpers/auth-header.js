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
