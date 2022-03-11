<template>
  <div
    v-if="alert.message"
    :class="`alert ${alert.type} alert-dismissible fade show position-fixed z-index-alert`"
    role="alert"
  >
    {{ alert.message }}
    <button type="button" class="btn-close" @click="this.clearAlert()"></button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AlertItem",
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },
  watch: {
    $route() {
      this.clearAlert();
    },
  },
};
</script>

<style>
.z-index-alert {
  z-index: 2;
  bottom: 0;
  right: 0;
  margin: 10px;
  text-align: center;
}
</style>
