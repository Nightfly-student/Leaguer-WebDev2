import express from "express";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";

const summonerRouter = express.Router();

summonerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    var data = {};
    await axios
      .get(
        `https://${req.query.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}`,
        {
          headers: {
            "Accept-Charset":
              "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": process.env.RIOT_API,
          },
        }
      )
      .then((res) => {
        data = {
          id: res.data.id,
          name: res.data.name,
          puuid: res.data.puuid,
          icon: res.data.profileIconId,
          level: res.data.summonerLevel,
          region: req.query.region,
        };
      })
      .catch((err) => {
        res.status(401).send({ message: "Unauthorized" });
      });
    res.status(200).send(data);
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
            "X-Riot-Token": process.env.RIOT_API,
          },
        }
      )
      .then((res) => {
        var index;
        var exists = res.data.some(function (item, i) {
          if ((item.queueType = "RANKED_SOLO_5x5")) {
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
