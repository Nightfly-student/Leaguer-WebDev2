import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import matchRouter from './routers/matchRouter.js';
import summonerRouter from "./routers/summonerRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 8080;


dotenv.config();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/leaguer", {
  useNewUrlParser: true,
});

app.use("/api/summoners", summonerRouter)
app.use("/api/matches", matchRouter)
app.use("/api/users", userRouter)

app.get("/", (req, res) => {
  res.send("Backend of Leaguer <3");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


//TODO
//Origin Riot API's Check