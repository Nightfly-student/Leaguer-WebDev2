<template>
  <div>
    <Form class="card-white m-1" :validation-schema="schema" @submit="onSubmit">
      <h2 class="text-center">Change Password</h2>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <Field
          type="password"
          name="oldPassword"
          id="oldPassword"
          class="form-control form-control-lg"
        />
        <label class="form-label" for="oldPassword">Old Password</label>
        <ErrorMessage
          class="form-label text-danger float-end"
          name="oldPassword"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <Field
          type="password"
          id="newPassword"
          class="form-control form-control-lg"
          name="newPassword"
        />
        <label class="form-label" for="newPassword">New Password</label>
        <ErrorMessage
          class="form-label text-danger float-end"
          name="newPassword"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <Field
          type="password"
          id="confirmNewPassword"
          class="form-control form-control-lg"
          name="confirmNewPassword"
        />
        <label class="form-label" for="confrimNewPassword"
          >Confirm New Password</label
        >
        <ErrorMessage
          class="form-label text-danger float-end"
          name="confirmNewPassword"
        />
      </div>

      <div class="d-flex justify-content-around align-items-center mb-4"></div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
          Update Password
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapState, mapActions } from "vuex";

export default {
  name: "UpdatePassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      oldPassword: yup.string().required("No password provided."),
      newPassword: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .matches(/^\S+$/, "No Whitespace Allowed"),
      confirmNewPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("newPassword"), null], "Passwords don't match."),
    });
    return {
      schema,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["updatePassword"]),
    onSubmit(values, { resetForm }) {
      this.updatePassword({
        oldPass: values.oldPassword,
        newPass: values.newPassword,
      });
      resetForm();
    },
  },
};
</script>

<style></style>
