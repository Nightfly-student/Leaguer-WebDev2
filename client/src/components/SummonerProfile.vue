<template>
  <div>
    <div class="row align-items-center">
      <div class="col-xl-3 col-md-6 col-sm-12 text-center">
        <img
          class="img-size"
          v-if="isMounted"
          :src="
            'http://ddragon.leagueoflegends.com/cdn/' +
            version +
            '/img/profileicon/' +
            summoner.icon +
            '.png'
          "
          :alt="summoner.icon"
        />
      </div>
      <div class="col-xl-3 col-md-6 col-sm-12 text-center">
        <h2>{{ summoner.name }}</h2>
        <button @click="$emit('update')" class="btn-primary btn p-2 fs-6">
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SummonerProfile",
  props: {
    summoner: Object,
  },
  data() {
    return {
      version: "",
      isMounted: false,
    };
  },
  mounted() {
    axios
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => {
        this.version = res.data[0];
        this.isMounted = true;
      });
  },
};
</script>

<style scoped>
.img-size {
  height: 150px;
}
</style>
