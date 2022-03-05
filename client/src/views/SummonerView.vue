<template>
  <div class="container-xl pt-4">
    <SummonerProfile @update="update()" v-if="isMounted" :summoner="summoner" />
    <hr />
    <div class="row">
      <SummonerStats v-if="isMounted" :summoner="summoner" />
      <SummonerMatches
        v-if="isMounted"
        :summoner="summoner"
        :trigger="trigger"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SummonerStats from "../components/SummonerStats.vue";
import SummonerProfile from "../components/SummonerProfile.vue";
import SummonerMatches from "../components/SummonerMatches.vue";

export default {
  name: "SummonerView",
  components: {
    SummonerStats,
    SummonerProfile,
    SummonerMatches,
  },
  data() {
    return {
      summoner: [],
      isMounted: false,
      trigger: 0,
    };
  },
  methods: {
    update() {
      this.isMounted = false;
      axios
        .get(
          `${import.meta.env.VITE_SERVER}/api/summoners?region=${
            this.$route.params.region}&name=${this.$route.params.summonerName}`
        )
        .then((res) => {
          this.summoner = res.data;
          this.isMounted = true;
          this.trigger++;
        })
        .catch((err) => {
          console.warn(err);
        });
    },
  },
  mounted() {
    this.update();
  },
  watch: {
    $route() {
      this.update();
    },
  },
};
</script>

<style>
hr {
  margin: 1rem 0;
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}
</style>
