<template>
  <div class="container-fluid">
    <div class="row spacing">
      <div class="col-xl-12 col-lg-12 col-sm-12 p-4 text-center">
        <img class="img-size" src="/images/ashe_search.png" />
        <div>
          <input
            v-model="summoner.summonerName"
            @keyup.enter="search(summoner)"
            type="text"
            class="input-text d-inline m-auto"
            placeholder="Search for your lol account..."
          />
          <select
            v-model="summoner.region"
            class="d-inline search-summoner"
            name="regions"
            id="regions"
          >
            <option value="euw1">EUW</option>
            <option value="na1">NA</option>
            <option value="eun1">EUNE</option>
            <option value="oc1">OCE</option>
            <option value="br1">BR</option>
            <option value="ru">RU</option>
            <option value="tr1">TR</option>
            <option value="la1">LAS</option>
            <option value="la2">LAn</option>
            <option value="kr">KR</option>
            <option value="jp1">JP</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchSummoner",
  data() {
    return {
      summoner: {
        summonerName: "",
        region: "euw1",
      },
    };
  },
  methods: {
    search(summoner) {
      this.$router.push({
        name: "Profile",
        params: {
          summonerName: summoner.summonerName,
          region: summoner.region,
        },
      });
    },
  },
};
</script>

<style>
.spacing {
  padding-top: 100px;
  padding-bottom: 100px;
}
input {
  width: 600px;
  height: 45px;
  border-radius: 10px;
  padding: 5px;
  border: #5383e8 2px solid;
}
.search-summoner {
  margin: 9px;
  margin-left: -100px;
  background: white;
  padding: 1px;
}
.img-size {
  height: 200px;
}
#regions {
  position: absolute;
  border: #b1b1b1 2px solid;
}

@media (max-width: 921px) {
  input {
    width: 80%;
  }
}
</style>
