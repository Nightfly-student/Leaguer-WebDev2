<template>
  <div class="row">
    <div class="col-md-4 col-sm-12 col-12">
      <div
        class="nav flex-column nav-pills mt-4"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <a
          class="nav-link link-dark"
          :class="{ active: CP }"
          @click="changeTab('CP')"
          id="CP"
          data-toggle="pill"
          href="#"
          role="tab"
          >Change Password</a
        >
        <a
          class="nav-link link-dark"
          :class="{ active: CU }"
          @click="changeTab('CU')"
          id="CU"
          data-toggle="pill"
          href="#"
          role="tab"
          >Change Username</a
        >
        <a
          class="nav-link link-dark"
          :class="{ active: CE }"
          @click="changeTab('CE')"
          id="CE"
          data-toggle="pill"
          href="#"
          role="tab"
          >Change Email</a
        >
      </div>
    </div>
    <div class="col-md-6 col-sm-12 col-12">
      <UpdatePassword v-if="CP" />
      <UpdateUsername v-if="CU" />
      <UpdateEmail v-if="CE" />
    </div>
  </div>
</template>

<script>
import UpdatePassword from "./UpdatePassword.vue";
import UpdateUsername from "./UpdateUsername.vue";
import UpdateEmail from "./UpdateEmail.vue";
export default {
  name: "ProfileSettings",
  components: {
    UpdatePassword,
    UpdateUsername,
    UpdateEmail,
  },
  data() {
    return {
      CP: true,
      CU: false,
      CE: false,
    };
  },
  methods: {
    changeTab(value) {
      this.CP = false;
      this.CU = false;
      this.CE = false;
      this[value] = true;
    },
  },
};
</script>

<style></style>
