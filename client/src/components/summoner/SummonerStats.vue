<template>
  <div class="col-xl-3 col-sm-12">
    <div v-if="isMounted">
      <div class="text-center" v-if="!stats.status">
        <p>No Ranked Games Recorded</p>
      </div>
      <div v-if="stats.status">
        <div class="m-auto text-center">
          <img
            class="img-size"
            :src="
              '/images/tiers/' +
              stats.tier.toLowerCase() +
              '_' +
              stats.rank.toLowerCase() +
              '.png'
            "
          />
          <p class="m-0">
            <b>{{ stats.tier }} {{ stats.rank }}</b>
          </p>
          <p class="m-0">
            <b>{{ stats.lp }} LP</b>/ {{ stats.wins }}W {{ stats.losses }}L
          </p>
          <p class="m-0">Win Rate {{ winrate(stats.wins, stats.losses) }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../helpers/axios-auth";

export default {
  name: "SummonerStats",
  props: {
    summoner: Object,
  },
  data() {
    return {
      stats: [],
      isMounted: false,
    };
  },
  methods: {
    winrate(wins, losses) {
      return ((wins / (wins + losses)) * 100).toFixed(1);
    },
  },
  mounted() {
    axios
      .get(
        `/api/summoners/info?region=${
          this.summoner.region
        }&id=${this.summoner.id}`
      )
      .then((res) => {
        this.stats = res.data;
        console.log(res.data);
        this.isMounted = true;
      })
      .catch((err) => {
        console.warn(err);
      });
  },
};
</script>

<style scoped>
.img-size {
  height: 150px;
}
.height-loader {
  height: 200px;
}
.padding-loader {
  padding: 100px;
}
</style>
