<template>
  <div>
    <img
      class="img-tiny"
      :src="
        'http://ddragon.leagueoflegends.com/cdn/' +
        version +
        '/img/champion/' +
        champion +
        '.png'
      "
    />
    <p @click="search()" class="m-0 p-0 font-small d-inline cursor">
      {{ name.slice(0, 8).toLowerCase() }}
    </p>
  </div>
</template>

<script>
export default {
  name: "SummonerItem",
  props: {
    name: String,
    champion: String,
    region: String,
    version: String,
  },
  methods: {
    search() {
      this.$router.push({
        name: "Profile",
        params: {
          summonerName: this.name,
          region: this.region,
        },
      });
    },
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
.cursor:hover {
  color: rgb(59, 59, 59);
}
</style>
