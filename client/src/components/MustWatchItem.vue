<template>
  <div class="overflow-auto h-table-must">
    <table v-if="isMounted" class="table h-100">
      <thead>
        <tr>
          <th class="ps-4" scope="col">Summoner</th>
          <th scope="col">Tier</th>
          <th scope="col">LP</th>
          <th class="ps-3" scope="col">Win Ratio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="summoner in summoners" :key="summoner.name">
          <td>
            <div class="d-flex flex-height">
              <img
                class="must-watch-icon ms-2 center-text-flex"
                :src="
                  'http://ddragon.leagueoflegends.com/cdn/' +
                  version +
                  '/img/profileicon/' +
                  summoner.icon +
                  '.png'
                "
              />
              <a
                @click="search(summoner.name, summoner.region)"
                class="fs-5 m-0 ps-1 center-text-flex pointer text-decoration-none text-dark"
                >{{ summoner.name }}</a
              >
            </div>
          </td>
          <td class="align-middle">
            {{
              summoner.tier.charAt(0).toUpperCase() +
              summoner.tier.slice(1).toLowerCase()
            }}
          </td>
          <td class="align-middle">
            {{ summoner.lp }}
          </td>
          <td>
            <div class="d-flex flex-height">
              <div class="d-flex flex-height max-width-must">
                <p class="w center-text-flex">{{ summoner.wins }}</p>
                <p class="center-text-flex">/</p>
                <p class="l center-text-flex">{{ summoner.losses }}</p>
              </div>
              <p class="ps-2 center-text-flex">
                {{
                  (
                    (summoner.wins / (summoner.wins + summoner.losses)) *
                    100
                  ).toFixed(1)
                }}%
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center mt-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../helpers/axios-auth";
export default {
  name: "MustWatchItem",
  data() {
    return {
      summoners: [],
      version: "",
      isMounted: false,
    };
  },
  methods: {
    showSummoners() {
      axios
        .get("/api/summoners/mustwatch")
        .then((res) => {
          this.summoners = res.data;
          this.isMounted = true;
        })
        .catch((err) => {
          console.warn(err.response.data);
        });
    },
    gameVersion() {
      axios
        .get("https://ddragon.leagueoflegends.com/api/versions.json")
        .then((res) => {
          this.version = res.data[0];
        });
    },
    search(name, region) {
      this.$router.push({
        name: "Profile",
        params: {
          summonerName: name,
          region: region,
        },
      });
    },
  },
  mounted() {
    this.gameVersion();
    this.showSummoners();
  },
};
</script>

<style>
.must-watch-icon {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
.nowrap {
  white-space: nowrap;
}
.w {
  margin-left: 8px;
  color: #3d95e5;
}
.l {
  margin-right: 8px;
  color: #ee5a52;
}
.center-text-flex {
  margin-top: auto !important;
  margin-bottom: auto !important;
}
.flex-height {
  height: 51px;
}
.max-width-must {
  width: 100px;
}
.h-table-must {
  height: 245px;
}
</style>
