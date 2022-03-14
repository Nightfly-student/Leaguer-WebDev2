<template>
  <div>
    <p>Username: {{ name }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>

<script>
import axios from "../../helpers/axios-auth";
import { getId, authHeader } from "../../helpers/auth-header";
export default {
  name: "ProfileItem",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    findUser() {
      axios
        .get(`/api/users/${getId()}`, { headers: authHeader() })
        .then((res) => {
          this.name = res.data.name;
          this.email = res.data.email;
        });
    },
  },
  mounted() {
    this.findUser();
  },
};
</script>

<style></style>
