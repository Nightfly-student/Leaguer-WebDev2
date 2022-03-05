<template>
  <section class="vh-100 min-height purple-bg">
    <div class="container py-5 h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img
            src="/images/ashe_search.png"
            class="img-fluid img-login"
            alt="Phone image"
          />
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form class="card-white m-1">
            <h2 class="text-center">Login</h2>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input
                type="email"
                id="form1Example13"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="form1Example13"
                >Email address</label
              >
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
              <input
                type="password"
                id="form1Example23"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="form1Example23">Password</label>
              <a class="ps-3" href="#!">Forgot password?</a>
            </div>

            <div
              class="d-flex justify-content-around align-items-center mb-4"
            ></div>
            <div class="text-center">
              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block w-100"
              >
                Sign in
              </button>
              <div class="d-flex justify-content-around align-items-center p-4">
                <router-link to="/register">Don't have an account?</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginView",
};
</script>

<style>
.img-login {
  max-height: 400px;
}
.card-white {
  padding: 30px;
  background: white;
  border-radius: 5px;
}
@media (max-width: 921px) {
  .min-height {
    height: 100%!important;
  }
}
</style>
