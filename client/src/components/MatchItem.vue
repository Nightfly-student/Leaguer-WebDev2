<template>
  <div class="col-12">
    <div :class="changeClass(participant.win)">
      <div class="row g-0 align-items-center">
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-4 text-center">
          <img
            class="img-main"
            :src="
              'http://ddragon.leagueoflegends.com/cdn/' +
              version +
              '/img/champion/' +
              participant.championName +
              '.png'
            "
          />
          <p class="font-small m-0">
            {{ getDate(match.info.gameStartTimestamp) }}
          </p>
          <p class="m-0">
            {{ gameLength }}
          </p>
        </div>
        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-2 d-none d-sm-block">
          <div class="m-auto">
            <img
              class="img-spell"
              :src="
                'http://ddragon.leagueoflegends.com/cdn/' +
                version +
                '/img/spell/' +
                getSumonnerSpells(participant.summoner1Id).image.full
              "
            />
            <img
              class="img-spell"
              :src="
                'http://ddragon.leagueoflegends.com/cdn/' +
                version +
                '/img/spell/' +
                getSumonnerSpells(participant.summoner2Id).image.full
              "
            />
            <img
              class="img-spell img-rune"
              :src="
                'http://ddragon.leagueoflegends.com/cdn/img/' +
                getRune(participant.perks.styles[0].style).icon
              "
            />
            <img
              class="img-spell img-rune"
              :src="
                'http://ddragon.leagueoflegends.com/cdn/img/' +
                getRune(participant.perks.styles[1].style).icon
              "
            />
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-4 text-center">
          <p class="m-0">
            {{ participant.kills }} /
            <span class="text-danger">{{ participant.deaths }}</span> /
            {{ participant.assists }}
          </p>
          <p v-if="participant.deaths > 0" class="m-0">
            {{
              (
                (participant.kills + participant.assists) /
                participant.deaths
              ).toFixed(2)
            }}:1 KDA
          </p>
          <p v-else class="m-0">
            Perfect KDA
          </p>
        </div>
        <div
          class="col-xl-2 col-lg-2 col-md-2 col-sm-0 text-center d-none d-md-block negative-margin-left"
        >
          <p class="font-small m-0">Level {{ participant.champLevel }}</p>
          <p class="font-small m-0">
            {{ participant.totalMinionsKilled }} ({{
              csPerMinute(participant.totalMinionsKilled)
            }}) CS
          </p>
          <p class="font-small m-0 text-danger">
            P/Kill
            {{
              killParticipation(
                participant.kills,
                participant.assists,
                participant.teamId
              )
            }}%
          </p>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-4">
          <div class="row g-0 justify-content-center">
            <div class="col-8 w-60">
              <div v-for="n in 6" :key="n">
                <img
                  class="img-item"
                  v-if="participant[`item${n - 1}`] != 0"
                  :src="
                    'http://ddragon.leagueoflegends.com/cdn/' +
                    version +
                    '/img/item/' +
                    participant[`item${n - 1}`] +
                    '.png'
                  "
                />
                <div
                  v-if="participant[`item${n - 1}`] === 0"
                  :class="changeColor(participant.win)"
                />
              </div>
            </div>
            <div class="col-4 m-auto">
              <img
                v-if="participant.item6 != 0"
                class="img-spell negative-margin-left"
                :src="
                  'http://ddragon.leagueoflegends.com/cdn/' +
                  version +
                  '/img/item/' +
                  participant.item6 +
                  '.png'
                "
              />
            </div>
          </div>
          <p class="m-0 p-0 font-small" v-if="participant.challenges">
            Control Ward {{ participant.challenges.controlWardsPlaced }}
          </p>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-3 d-none d-md-block">
          <div class="row g-0">
            <div class="col-6">
              <div v-for="participant in blueTeam" :key="participant.summonerName">
                <SummonerItem
                  :champion="participant.championName"
                  :name="participant.summonerName"
                  :region="summoner.region"
                  :version="version"
                />
              </div>
            </div>
            <div class="col-6">
              <div v-for="participant in redTeam" :key="participant.summonerName">
                <SummonerItem
                  :champion="participant.championName"
                  :name="participant.summonerName"
                  :region="summoner.region"
                  :version="version"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import SummonerItem from "./SummonerItem.vue";

export default {
  name: "MatchItem",
  props: {
    summoner: Object,
    match: Object,
    version: String,
    summonerSpells: Object,
    runes: Object,
  },
  components: {
    SummonerItem,
  },
  data() {
    return {
      participant: Object,
      gameLength: "",
      redTeam: [],
      blueTeam: [],
    };
  },
  methods: {
    findParticipant(participants) {
      const p = participants.find(
        (participant) => participant.puuid === this.summoner.puuid
      );
      this.participant = p;
    },
    getGameLength(start, end) {
      var startTime = moment(start).format();
      var endTime = moment(end).format();
      var duration = moment(endTime).diff(startTime);
      this.gameLength = moment(duration).format("mm:ss");
    },
    getDate(gameDate) {
      return moment(gameDate).fromNow();
    },
    getSumonnerSpells(id) {
      return Object.values(this.summonerSpells.data).find(
        (spell) => spell.key === id.toString()
      );
    },
    getRune(id) {
      return this.runes.find((rune) => rune.id === id);
    },
    csPerMinute(cs) {
      return (parseFloat(this.gameLength.replace(":", ".")) / cs).toFixed(1);
    },
    killParticipation(kills, assists, teamId) {
      var totalTeamKills = this.match.info.teams.find(
        (team) => team.teamId === teamId
      ).objectives.champion.kills;
      var totalContribution = kills + assists;
      return ((totalContribution / totalTeamKills) * 100).toFixed(0);
    },
    changeClass(value) {
      return {
        "card won p-2 m-2": value,
        "card lost p-2 m-2": !value,
      };
    },
    changeColor(value) {
      return {
        "empty-block win-block": value,
        "empty-block lose-block": !value,
      };
    },
    findTeam(participants) {
      participants.forEach(participant => {
        if(participant.teamId === 100) {
          this.blueTeam.push(participant);
        } else {
          this.redTeam.push(participant);
        }
      });
    },
  },
  mounted() {
    //console.log(this.match);
  },
  created() {
    this.findParticipant(this.match.info.participants);
    this.getGameLength(
      this.match.info.gameStartTimestamp,
      this.match.info.gameEndTimestamp
    );
    this.findTeam(this.match.info.participants);
  },
};
</script>

<style>
.lost {
  background-color: #e2b6b3;
}
.won {
  background-color: #a3cfec;
}
.img-main {
  height: 70px;
  border-radius: 50%;
}
.img-spell {
  height: 33px;
  padding: 1px;
}
.img-rune {
  background-color: rgba(255, 255, 255, 0);
  border-radius: 4px;
  padding: 2px;
}
.img-item {
  height: 25px;
  padding: 1px;
  float: left;
}
.img-tiny {
  height: 15px;
  padding-right: 2px;
}
.negative-margin-left {
  margin-left: -5px;
}
.empty-block {
  height: 23px;
  width: 23px;
  margin: 1px;
  float: left;
}
.win-block {
  background: #99b9cf;
}
.lose-block {
  background: #cea7a7;
}
.w-60 {
  max-width: 60%;
}
.font-small {
  font-size: 14px;
}
</style>
