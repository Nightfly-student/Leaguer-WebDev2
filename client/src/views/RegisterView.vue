<template>
  <section class="purple-bg min-height vh-100">
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
            <h2 class="text-center">Register</h2>
            <div class="form-outline mb-4">
              <input
                type="text"
                id="form1Example13"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="form1Example13">Username</label>
            </div>
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
            </div>
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input
                type="password"
                id="form1Example23"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="form1Example23">Re-Password</label>
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block w-100"
              >
                Sign up
              </button>
              <div class="d-flex justify-content-around align-items-center p-4">
                <router-link to="/login">Already an Account?</router-link>
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
  name: "RegisterView",
  methods: {
    register() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>

</style>
