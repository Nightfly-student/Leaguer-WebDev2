<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-xl">
      <router-link to="/" class="navbar-brand">Leaguer</router-link>
      <button
        type="button"
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link active" to="/"
            >Home</router-link
          >
          <a href="#" class="nav-item nav-link">Champions</a>
          <a href="#" class="nav-item nav-link">Messages</a>
          <div
            v-if="!homePageCheck()"
            href="#"
            class="nav-item m-auto ps-3 w-100"
          >
            <input
              v-model="sum.summonerName"
              @keyup.enter="search(sum)"
              placeholder="search for summoner..."
              type="text"
              class="styling-search"
            />
            <select
              v-model="sum.region"
              class="d-inline regions"
              name="regions"
              id="regions"
            >
              <option value="euw1">EUW</option>
              <option value="na1">NA</option>
              <option value="eun1">EUNE</option>
              <option value="oc1">OCE</option>
              <option value="br1">BR</option>
              <option value="ru">RU</option>
              <option value="tr1">TR</option>
              <option value="la1">LAS</option>
              <option value="la2">LAn</option>
              <option value="kr">KR</option>
              <option value="jp1">JP</option>
            </select>
          </div>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link v-if="!checkLogged" to="/login" class="nav-item nav-link"
            >Login</router-link
          >
          <a
            v-else
            class="nav-item nav-link"
            href="#"
            @click="Logout"
            role="button"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MenuBar",
  data() {
    return {
      sum: {
        summonerName: "",
        region: "euw1",
      },
    };
  },
  methods: {
    homePageCheck() {
      if (this.$route.path == "/" || this.$route.path == "/home") {
        return true;
      } else {
        return false;
      }
    },
    ...mapActions({
      logout: "account/logout",
    }),
    Logout() {
      this.logout();
      this.logged = false;
    },
    search(summoner) {
      this.$router.push({
        name: "Profile",
        params: {
          summonerName: summoner.summonerName,
          region: summoner.region,
        },
      });
      this.sum.summonerName = "";
    },
  },
  computed: {
    checkLogged() {
      return this.$store.state.account.status.loggedIn ? true : false;
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #5383e8;
}
input {
  max-width: 300px;
  max-height: 40px;
}
.regions {
  font-size: 12px;
  margin: 9.5px;
  margin-left: -80px;
  background-color: #dce7ff;
}
.styling-search {
  background: #b7ceff;
  padding: 10px;
}
</style>
