<template>
  <div>
    <h2 class="fs-4">Add Summoner</h2>
    <input
      v-model="sum.summonerName"
      placeholder="Summoner Name"
      type="text"
      class="styling-admin-add"
    />
    <select
      v-model="sum.region"
      class="d-inline regions"
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
      <option value="la2">LAN</option>
      <option value="kr">KR</option>
      <option value="jp1">JP</option>
    </select>
    <button @click="onClick" class="btn btn-primary add-summoner-button">
      Add Summoner
    </button>
    <p>Add Summoner to the must watch list on homepage</p>
  </div>
</template>

<script>
import { authHeader } from "../../helpers/auth-header";
import axios from "../../helpers/axios-auth";

export default {
  name: "AddSummoner",
  data() {
    return {
      users: [],
      sum: {
        summonerName: "",
        region: "euw1",
      },
    };
  },
  methods: {
    checkSummoner() {
      axios
        .get(
          `/api/summoners?region=${this.sum.region}&name=${this.sum.summonerName}`
        )
        .then(() => {
          this.addSummoner();
        })
        .catch(() => {
          alert("Couldnt Find Summoner");
          return;
        });
    },
    addSummoner() {
      axios
        .post(
          "/api/summoners",
          { name: this.sum.summonerName, region: this.sum.region },
          { headers: authHeader() }
        )
        .then(() => {
          alert(
            `added ${this.sum.summonerName} from region ${this.sum.region}`
          );
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    onClick() {
      this.checkSummoner();
    },
  },
};
</script>

<style>
.regions {
  font-size: 16px;
  margin: 12.5px;
  margin-left: -90px;
  width: 75px;
  background-color: white;
}
.styling-admin-add {
  border-radius: 0px;
  height: 50px;
}
.styling-admin-add:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
  transition: none;
  -webkit-transition: none;
  padding: 5px;
  border: none;
}
.add-summoner-button {
  height: 50px;
  margin-bottom: 4px;
  margin-left: -2px;
}
</style>
