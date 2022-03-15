<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-6 col-sm-12 col-12">
            <h1 class="pt-3">Leaguer</h1>
            <h2 class="">Your Info Source</h2>
          </div>
          <div class="col-sm-6 col-0 d-none d-md-block"></div>
        </div>
      </div>
    </header>
    <SearchSummoner />
    <div class="purple-bg">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-6 col-md-12 pt-4">
            <div class="white-box">
              <h2 class="text-center">Must Watch Players</h2>
              <MustWatchItem />
            </div>
          </div>
          <div class="col-xl-6 col-md-12 pt-4">
            <div class="white-box">
              <h2 class="text-center">Champion Rotation</h2>
              <ChampionRotation />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSummoner from "../components/summoner/SearchSummoner.vue";
import ChampionRotation from "../components/ChampionRotation.vue";
import MustWatchItem from "../components/MustWatchItem.vue";
export default {
  name: "HomeView",
  components: {
    SearchSummoner,
    ChampionRotation,
    MustWatchItem,
  },
};
</script>

<style>
header {
  background-color: #5383e8;
  padding-top: 150px;
  padding-bottom: 150px;
}
.white-box {
  background-color: #ffffff;
  border-radius: 10px;
  height: 300px;
}
.purple-bg {
  background-color: #5383e8;
}
@media (max-width: 921px) {
  header {
    text-align: center;
  }
}
</style>
