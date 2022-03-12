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
          <Form
            :validation-schema="schema"
            class="card-white m-1"
            @submit="onSubmit"
          >
            <h2 class="text-center">Register</h2>
            <div class="form-outline mb-4">
              <Field
                type="text"
                id="username"
                name="username"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="username">Username</label>
              <ErrorMessage
                class="form-label text-danger float-end"
                name="username"
              />
            </div>
            <div class="form-outline mb-4">
              <Field
                type="email"
                id="email"
                name="email"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="email">Email address</label>
              <ErrorMessage
                class="form-label text-danger float-end"
                name="email"
              />
            </div>
            <div class="form-outline mb-4">
              <Field
                type="password"
                id="password"
                name="password"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="password">Password</label>
              <ErrorMessage
                class="form-label text-danger float-end"
                name="password"
              />
            </div>
            <div class="form-outline mb-4">
              <Field
                type="password"
                id="repassword"
                name="repassword"
                class="form-control form-control-lg"
              />
              <label class="form-label" for="form1Example23">Re-Password</label>
              <ErrorMessage
                class="form-label text-danger float-end"
                name="repassword"
              />
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
  name: "RegisterView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      username: yup
        .string()
        .required()
        .matches(/^\S+$/, "No Whitespace Allowed"),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .matches(/^\S+$/, "No Whitespace Allowed"),
      repassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords don't match."),
    });
    return {
      schema,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["register"]),
    onSubmit(values) {
      const user = {
        name: values.username,
        email: values.email,
        password: values.password,
      };
      this.register(user);
    },
  },
};
</script>

<style></style>
