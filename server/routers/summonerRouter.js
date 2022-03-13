import express from "express";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import Summoner from "../models/summoner.js";
import { isAdmin, isAuth } from "../utils.js";

const summonerRouter = express.Router();

summonerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    await axios
      .get(
        `https://${
          req.query.region
        }.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
          req.query.name
        )}`,
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
        if (err.response.status === 404) {
          res.status(404).send({ message: err.message });
        }
        if (err.response.status === 401) {
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
summonerRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    try {
      const summoner = new Summoner({
        name: req.body.name,
        region: req.body.region,
      });
      const createdSummoner = await summoner.save();
      res.status(201).send(true);
    } catch (err) {
      next(err);
    }
  })
);

summonerRouter.get(
  "/mustwatch",
  expressAsyncHandler(async (res, next) => {
    try {
      const summoners = Summoner.find({});
      if (summoners) {
        var players = [];
        const promises = summoners.map(async (data) => {
          let waitForThisData = await timeout(data);
          return axios
            .get(
              `https://${
                data.region
              }.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
                data.name
              )}`,
              {
                headers: {
                  "Accept-Charset":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                  "X-Riot-Token": process.env.RIOT_API,
                },
              }
            )
            .then((response) => {
              var player = {
                id: response.data.id,
                name: response.data.name,
                puuid: response.data.puuid,
                icon: response.data.profileIconId,
                level: response.data.summonerLevel,
                region: data.region,
              };
              players.push(player);
            })
            .catch((err) => console.log(err));
        });
        await Promise.all(promises);

        const playerData = [];

        const promisesDetails = players.map(async (player) => {
          let waitForThisData = await timeout(data);
          return axios
            .get(
              `https://${player.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.id}`,
              {
                headers: {
                  "Accept-Charset":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                  "X-Riot-Token": process.env.RIOT_API,
                },
              }
            )
            .then((response) => {
              var index;
              var exists = response.data.some(function (item, i) {
                if (item.queueType === "RANKED_SOLO_5x5") {
                  index = i;
                  return true;
                }
              });
              if (exists) {
                var playerDetails = {
                  tier: response.data[index].tier,
                  rank: response.data[index].rank,
                  wins: response.data[index].wins,
                  losses: response.data[index].losses,
                  lp: response.data[index].leaguePoints,
                };
                playerData.push(playerDetails);
              }
            })
            .catch((err) => console.log(err));
        });
        await Promise.all(promisesDetails);
        res.status(200).send(playerData);
      } else {
        res.status(404).send({ message: "Summoners Not Found" });
      }
    } catch (err) {
      next(err);
    }
  })
);

export default summonerRouter;
