<template>
  <div class="container-xl">
    <h2 class="pt-4">Hi Admin :)</h2>
    <UserTable />
    <hr />
    <AddSummoner />
  </div>
</template>

<script>
import UserTable from "../components/adminComponents/UserTable.vue";
import AddSummoner from "../components/adminComponents/AddSummoner.vue";

export default {
  name: "AdminDashboard",
  components: {
    UserTable,
    AddSummoner,
  },
};
</script>

<style></style>
