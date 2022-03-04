<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-6 col-sm-12">
            <h1 class="pt-3">Leaguer</h1>
            <h2 class="">Your Info Source</h2>
          </div>
          <div class="col-6">
            <p>idk</p>
          </div>
        </div>
      </div>
    </header>
    <SearchSummoner/>
    <div class="purple-bg">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-6 col-md-12 pt-4">
            <div class="white-box">
              <h2 class="text-center">Learn More About...</h2>
            </div>
          </div>
          <div class="col-xl-6 col-md-12 pt-4">
            <div class="white-box">
              <h2 class="text-center">Cool other stuff...</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSummoner from '../components/SearchSummoner.vue'
export default {
  name: "HomeView",
  components: {
    SearchSummoner,
  },
};
</script>

<style>
header {
  background-color: #5383e8;
  padding: 150px;
}
.white-box {
  background-color: #ffffff;
  border-radius: 10px;
  height: 300px;
}
.purple-bg {
  background-color: #5383e8;
}
</style>
