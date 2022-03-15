<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link pointer"
          :class="{ active: regularRotation }"
          @click="setTab('regularRotation')"
          aria-current="page"
          >Regular</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link pointer"
          :class="{ active: freeRotation }"
          @click="setTab('freeRotation')"
          >Newbies</a
        >
      </li>
    </ul>
    <div
      v-if="freeRotation"
      class="row justify-content-center max-height-scroll"
    >
      <div class="col-2 pt-2 m-2" v-for="fr in free" :key="fr">
        <img
          class="img-champRotation-size"
          :src="
            'http://ddragon.leagueoflegends.com/cdn/' +
            version +
            '/img/champion/' +
            fr +
            '.png'
          "
        />
      </div>
    </div>
    <div
      v-if="regularRotation"
      class="row justify-content-center max-height-scroll"
    >
      <div class="col-2 pt-2 m-2" v-for="rg in regular" :key="rg">
        <img
          class="img-champRotation-size"
          :src="
            'http://ddragon.leagueoflegends.com/cdn/' +
            version +
            '/img/champion/' +
            rg +
            '.png'
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../helpers/axios-auth";
export default {
  name: "ChampionRotation",
  data() {
    return {
      free: [],
      regular: [],
      version: "",
      freeRotation: false,
      regularRotation: true,
    };
  },
  methods: {
    gameVersion() {
      axios
        .get("https://ddragon.leagueoflegends.com/api/versions.json")
        .then((res) => {
          this.version = res.data[0];
        });
    },
    getRotation() {
      axios
        .get("/api/champions")
        .then((res) => {
          axios
            .get(
              `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/champion.json`
            )
            .then((response) => {
              res.data.regular.forEach((champ) => {
                this.regular.push(
                  Object.values(response.data.data).find(
                    (obj) => obj.key === champ.toString()
                  ).id
                );
              });
              res.data.free.forEach((champ) => {
                this.free.push(
                  Object.values(response.data.data).find(
                    (obj) => obj.key === champ.toString()
                  ).name
                );
              });
            });
        })
        .catch((err) => {
          console.warn(err.repsonse.data);
        });
    },
    setTab(value) {
      this.freeRotation = false;
      this.regularRotation = false;
      this[value] = true;
    },
  },
  mounted() {
    this.gameVersion();
    this.getRotation();
  },
};
</script>

<style>
.img-champRotation-size {
  height: 75px;
}
.max-height-scroll {
  height: 210px;
  overflow: auto;
  width: 101%;
}
.pointer {
  cursor: pointer;
}
</style>
