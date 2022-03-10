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
          <Form
            class="card-white m-1"
            :validation-schema="schema"
            @submit="onSubmit"
          >
            <h2 class="text-center">Login</h2>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <Field
                type="email"
                name="email"
                id="email"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="email">Email address</label>
              <ErrorMessage
                class="form-label text-danger float-end"
                name="email"
              />
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
              <Field
                type="password"
                id="password"
                class="form-control form-control-lg"
                name="password"
              />
              <label class="form-label" for="password">Password</label>
              <ErrorMessage
                class="form-label text-danger float-end"
                name="password"
              />
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
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapState, mapActions } from "vuex";
import * as yup from "yup";

export default {
  name: "LoginView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required("No password provided."),
    });
    return {
      schema,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["login"]),
    onSubmit(values) {
      this.login({ email: values.email, password: values.password });
    },
  },
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
    height: 100% !important;
  }
}
</style>
