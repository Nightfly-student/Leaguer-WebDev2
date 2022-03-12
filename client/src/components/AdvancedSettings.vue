<template>
  <button @click="onClick" class="btn btn-danger m-4">Delete Account</button>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AdvancedSettings",
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["deleteAccount"]),
    onClick() {
      if (confirm("Are you sure?")) {
        this.deleteAccount();
      }
    },
  },
};
</script>

<style></style>
