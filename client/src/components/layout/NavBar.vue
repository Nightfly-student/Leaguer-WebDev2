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
            >Home</router-link>
          <a href="#" class="nav-item nav-link">Champions</a>
          <a href="#" class="nav-item nav-link">Messages</a>
        </div>
        <div class="navbar-nav ms-auto">
          <a href="#" class="nav-item nav-link">Login</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  name: "NavBar",
};
</script>

<style>
nav {
    background-color: #5383E8;
}
</style>
