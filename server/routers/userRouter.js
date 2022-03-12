import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken, isAuth } from "../utils.js";
import e from "express";

const userRouter = express.Router();

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          token: generateToken(user),
        });
      }
    } else {
      res.status(409).send({ message: "Invalid email or password" });
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

      res.status(201).send(true);
    } catch (err) {
      if (err.code && err.code == 11000) {
        const field = Object.keys(err.keyValue);
        return res
          .status(409)
          .send({ message: `An account with that ${field} already exists.` });
      }
      next(err);
    }
  })
);

//update password//
userRouter.put(
  "/password/:id",
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    try {
      if (req.user._id === req.params.id) {
        const user = await User.findById(req.params.id);
        if (user) {
          const matched = await bcrypt.compare(req.body.oldPass, user.password);
          const matchedNew = await bcrypt.compare(
            req.body.newPass,
            user.password
          );
          if (matched) {
            if (!matchedNew) {
              user.password = req.body.newPass
                ? bcrypt.hashSync(req.body.newPass)
                : user.password;
              await user.save();
              res.status(200).send({ message: "Updated Password" });
            } else {
              res
                .status(409)
                .send({ message: "New Password is same as Old Password" });
            }
          } else {
            res.status(409).send({ message: "Old Password is incorrect" });
          }
        } else {
          res.status(404).send({ message: "No User Found" });
        }
      } else {
        res.status(401).send({ message: "Invalid User" });
      }
    } catch (err) {
      next(err);
    }
  })
);
//change username//
userRouter.put(
  "/username/:id",
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    try {
      if (req.user._id === req.params.id) {
        const user = await User.findById(req.params.id);
        if (user) {
          if (user.name != req.body.name) {
            user.name = req.body.name;
            await user.save();
            res.status(200).send({ message: "Updated Username" });
          } else {
            res
              .status(409)
              .send({ message: "New And Old Username Are The Same" });
          }
        } else {
          res.status(404).send({ message: "No User Found" });
        }
      } else {
        res.status(401).send({ message: "Invalid User" });
      }
    } catch (err) {
      if (err.code && err.code == 11000) {
        const field = Object.keys(err.keyValue);
        return res
          .status(409)
          .send({ message: `An account with that ${field} already exists.` });
      }
      next(err);
    }
  })
);

userRouter.put(
  "/email/:id",
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    try {
      if (req.user._id === req.params.id) {
        const user = await User.findById(req.params.id);
        if (user) {
          if (user.email != req.body.email) {
            user.email = req.body.email;
            await user.save();
            res.status(200).send({ message: "Updated Email" });
          } else {
            res.status(409).send({ message: "New And Old Email Are The Same" });
          }
        } else {
          res.status(404).send({ message: "No User Found" });
        }
      } else {
        res.status(401).send({ message: "Invalid User" });
      }
    } catch (err) {
      if (err.code && err.code == 11000) {
        const field = Object.keys(err.keyValue);
        return res
          .status(409)
          .send({ message: `An account with that ${field} already exists.` });
      }
      next(err);
    }
  })
);

//delete user//
userRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send({ message: "Successfully Deleted Account" });
    } else {
      res.status(409).send({ message: "Invalid Account" });
    }
  })
);

export default userRouter;
