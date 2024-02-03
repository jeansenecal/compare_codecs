import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { UserDocument } from "../models/User";
import { IVerifyOptions } from "passport-local";

export const ensureAuth = function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      //return next(new Error('wrong to'));
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
}

export const ensureGuest = function (req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}
  