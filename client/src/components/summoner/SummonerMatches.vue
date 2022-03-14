<template>
  <div class="col-xl-8 col-sm-12" v-if="isMounted">
    <div v-for="match in matches" :key="match">
      <MatchItem
        :match="match"
        :summonerSpells="summonerSpells"
        :version="version"
        :summoner="summoner"
        :runes="runes"
      />
    </div>
  </div>
  <div v-else class="col-xl-8 col-sm-12 m-auto text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MatchItem from "./MatchItem.vue";
import moment from "moment";

export default {
  name: "SummonerMatches",
  props: {
    summoner: Object,
    trigger: Number,
  },
  components: {
    MatchItem,
  },
  data() {
    return {
      matches: [],
      version: "",
      summonerSpells: [],
      runes: [],
      isMounted: false,
    };
  },
  methods: {
    region(region) {
      if (
        region === "euw1" ||
        region === "eun1" ||
        region === "tr1" ||
        region === "ru"
      ) {
        return "europe";
      }
      if (
        region === "na1" ||
        region === "br1" ||
        region === "la1" ||
        region === "la2" ||
        region === "oc1"
      ) {
        return "americas";
      }
      if (region === "kr" || region === "jp1") {
        return "asia";
      }
    },
    loadMatches() {
      axios
        .get(
          `${import.meta.env.VITE_SERVER}/api/matches?puuid=${
            this.summoner.puuid
          }&region=${this.region(this.summoner.region)}&limit=10`
        )
        .then((res) => {
          axios
            .get(
              `${import.meta.env.VITE_SERVER}/api/matches/info?matches=${
                res.data
              }&region=${this.region(this.summoner.region)}`
            )
            .then((response) => {
              var sortedMatches = response.data.sort(function (a, b) {
                a = new moment(a.info.gameStartTimestamp);
                b = new moment(b.info.gameStartTimestamp);
                return a > b ? -1 : 1;
              });
              this.matches = sortedMatches;
              this.isMounted = true;
            });
        });
    },
    findGameVersion() {
      axios
        .get("https://ddragon.leagueoflegends.com/api/versions.json")
        .then((res) => {
          this.version = res.data[0];
          axios
            .get(
              `http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/summoner.json`
            )
            .then((res) => {
              this.summonerSpells = res.data;
            });
          axios
            .get(
              `http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/runesReforged.json`
            )
            .then((res) => {
              this.runes = res.data;
            });
        });
    },
  },
  mounted() {
    this.findGameVersion();
    this.loadMatches();
  },
  watch: {
    trigger: function () {
      this.loadMatches();
    },
  },
};
</script>

<style></style>
