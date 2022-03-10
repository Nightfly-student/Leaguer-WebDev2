import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../utils.js";
import e from "express";

const userRouter = express.Router();

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res, next) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();

      res.send(true);
    } catch (err) {
      if (err.code && err.code == 11000) {
        const field = Object.keys(err.keyValue);
        return res
          .status(409)
          .send({message: `An account with that ${field} already exists.`});
      }
      next(err);
    }
  })
);

export default userRouter;
