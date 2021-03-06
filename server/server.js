import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from "cookie-parser";
import matchRouter from './routers/matchRouter.js';
import summonerRouter from "./routers/summonerRouter.js";
import userRouter from "./routers/userRouter.js";
import championRouter from "./routers/championRouter.js";

const app = express();

app.use(cors());
app.use(cookieParser());

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
app.use("/api/champions", championRouter);

app.get("/", (req, res) => {
  res.send("Backend of Leaguer <3");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});