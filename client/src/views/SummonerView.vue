<template>
  <div class="container-xl pt-4">
    <SummonerProfile
      @update="update()"
      v-if="isMounted && found"
      :summoner="summoner"
    />
    <h1 class="text-center" v-if="!found && isMounted">
      Summoner does not exist
    </h1>
    <hr />
    <div class="row">
      <SummonerStats v-if="isMounted && found" :summoner="summoner" />
      <SummonerMatches
        v-if="isMounted && found"
        :summoner="summoner"
        :trigger="trigger"
      />
    </div>
  </div>
</template>

<script>
import axios from "../helpers/axios-auth";
import SummonerStats from "../components/summoner/SummonerStats.vue";
import SummonerProfile from "../components/summoner/SummonerProfile.vue";
import SummonerMatches from "../components/summoner/SummonerMatches.vue";

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
      found: false,
    };
  },
  methods: {
    update() {
      this.isMounted = false;
      axios
        .get(
          `/api/summoners?region=${this.$route.params.region}&name=${this.$route.params.summonerName}`
        )
        .then((res) => {
          if (res.status === 200) {
            this.summoner = res.data;
            this.isMounted = true;
            this.found = true;
            this.trigger++;
          }
        })
        .catch(() => {
          this.found = false;
          this.isMounted = true;
        });
    },
  },
  mounted() {
    this.update();
  },
  watch: {
    $route(to) {
      if (to.name == "Profile") {
        this.update();
      }
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
