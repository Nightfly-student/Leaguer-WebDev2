<template>
  <div class="container-xl">
    <h2 class="pt-4">Settings</h2>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="navbar-nav">
        <a
          href="#"
          class="nav-item nav-link p-0 pe-4"
          :class="{ active: profile }"
          @click="changeTab('profile')"
          >profile</a
        >
        <a
          href="#"
          class="nav-item nav-link p-0 pe-4"
          :class="{ active: additional }"
          @click="changeTab('additional')"
          >advanced settings</a
        >
      </div>
    </nav>
    <ProfileSettings v-if="profile"/>
    <AdvancedSettings v-if="additional"/>
  </div>
</template>

<script>
import ProfileSettings from "../components/settings/ProfileSettings.vue";
import AdvancedSettings from "../components/settings/AdvancedSettings.vue";

export default {
  name: "SettingsView",
  components: {
    ProfileSettings,
    AdvancedSettings,
  },
  data() {
    return {
      profile: true,
      additional: false,
    };
  },
  methods: {
    changeTab(value) {
      this.profile = false;
      this.additional = false;
      this[value] = true;
    },
  },
};
</script>

<style></style>
