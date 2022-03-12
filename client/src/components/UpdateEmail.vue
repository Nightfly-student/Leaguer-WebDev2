<template>
  <div>
    <Form class="card-white m-1" :validation-schema="schema" @submit="onSubmit">
      <h2 class="text-center">Change Email</h2>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <Field
          type="email"
          name="email"
          id="email"
          class="form-control form-control-lg"
        />
        <label class="form-label" for="email">New Email</label>
        <ErrorMessage class="form-label text-danger float-end" name="email" />
      </div>

      <div class="d-flex justify-content-around align-items-center mb-4"></div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
          Update Email
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
  name: "UpdateEmail",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
    });
    return {
      schema,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["updateEmail"]),
    onSubmit(values, { resetForm }) {
      this.updateEmail({
        email: values.email,
      });
      resetForm();
    },
  },
};
</script>

<style></style>
