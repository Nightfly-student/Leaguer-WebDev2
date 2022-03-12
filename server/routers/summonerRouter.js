import express from "express";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";

const summonerRouter = express.Router();

summonerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    await axios
      .get(
        `https://${req.query.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(req.query.name)}`,
        {
          headers: {
            "Accept-Charset":
              "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept-Language": "nl,en-US;q=0.7,en;q=0.3",
            "X-Riot-Token": process.env.RIOT_API,
          },
        }
      )
      .then((response) => {
        var data = {
          id: response.data.id,
          name: response.data.name,
          puuid: response.data.puuid,
          icon: response.data.profileIconId,
          level: response.data.summonerLevel,
          region: req.query.region,
        };
        res.status(200).send(data);
      })
      .catch((err) => {
        if(err.response.status === 404) {
          res.status(404).send({ message: err.message }); 
        }
        if(err.response.status === 401) {
          res.status(401).send({ message: "Unauthorized" });
        }
      });
  })
);
summonerRouter.get(
  "/info",
  expressAsyncHandler(async (req, res) => {
    var data = {};
    await axios
      .get(
        `https://${req.query.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.query.id}`,
        {
          headers: {
            "Accept-Charset":
              "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept-Language": "nl,en-US;q=0.7,en;q=0.3",
            "X-Riot-Token": process.env.RIOT_API,
          },
        }
      )
      .then((res) => {
        var index;
        var exists = res.data.some(function (item, i) {
          if (item.queueType === "RANKED_SOLO_5x5") {
            index = i;
            return true;
          }
        });
        if (exists) {
          data = {
            tier: res.data[index].tier,
            rank: res.data[index].rank,
            wins: res.data[index].wins,
            losses: res.data[index].losses,
            lp: res.data[index].leaguePoints,
            status: true,
          };
        } else {
          data = {
            status: false,
            message: "No Ranked Games Played",
          };
        }
      })
      .catch(() => {
        res.status(401).send({ message: "Unauthorized" });
      });
    res.status(200).send(data);
  })
);

export default summonerRouter;
