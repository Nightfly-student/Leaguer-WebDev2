<template>
  <div>
    <Form class="card-white m-1" :validation-schema="schema" @submit="onSubmit">
      <h2 class="text-center">Change Username</h2>
      <!-- Username input -->
      <div class="form-outline mb-4">
        <Field
          type="text"
          name="username"
          id="username"
          class="form-control form-control-lg"
        />
        <label class="form-label" for="username">Desired Username</label>
        <ErrorMessage class="form-label text-danger float-end" name="email" />
      </div>

      <div class="d-flex justify-content-around align-items-center mb-4"></div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
          Update Username
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
  name: "UpdateUsername",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      username: yup
        .string()
        .required()
        .matches(/^\S+$/, "No Whitespace Allowed"),
    });
    return {
      schema,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["updateUsername"]),
    onSubmit(values, { resetForm }) {
      this.updateUsername({
        username: values.username,
      });
      resetForm();
    },
  },
};
</script>

<style></style>
