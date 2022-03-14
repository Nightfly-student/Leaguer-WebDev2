<template>
  <div v-if="!noAuth">
    <h2 class="pt-4 fs-4">All Users</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Admin</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <th scope="row">{{ user._id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <select @change="updateRole(user._id)" v-model="user.isAdmin">
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </td>
          <td>
            <button @click="deleteUser(user._id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <h2 class="text-center">No Token, Please Relog</h2>
  </div>
</template>

<script>
import { authHeader, getId } from "../../helpers/auth-header";
import axios from "../../helpers/axios-auth";

export default {
  name: "UserTable",
  data() {
    return {
      users: [],
      noAuth: false,
    };
  },
  methods: {
    getUsers() {
      axios
        .get(`/api/users/`, { headers: authHeader() })
        .then((res) => {
          this.users = res.data;
          this.noAuth = false;
        })
        .catch((err) => {
          this.noAuth = true;
          console.warn(err.response.data.message);
        });
    },
    deleteUser(id) {
      if (id === getId()) {
        alert("Go to settings to delete yourself");
        return;
      }
      if (confirm("Are you sure?")) {
        axios
          .delete(`/api/users/${id}/admin`, { headers: authHeader() })
          .then(() => {
            var findIndex = this.users.findIndex((user) => user._id === id);
            this.users.splice(findIndex, 1);
          })
          .catch((err) => {
            console.warn(err.response.data.message);
          });
      }
    },
    updateRole(id) {
      var state =
        this.users[this.users.findIndex((user) => user._id === id)].isAdmin;
      axios
        .put(
          `/api/users/${id}/admin`,
          { state: state },
          { headers: authHeader() }
        )
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => alert(err.response.data.message));
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
