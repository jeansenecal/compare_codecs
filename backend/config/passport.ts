import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import { Document } from "mongoose";
import { Request } from "express";
import User, { IUser, UserDocument } from "../models/User";

module.exports = async function (passport: any) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email: string, password: string, done: any) => {
        try {
            const user = await User.findOne({ email: email.toLowerCase() });
          
            if (!user) {
              return done(null, false, { message: `Email ${email} not found.` });
            }
          
            if (!user.password) {
              return done(null, false, {
                message:
                  "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
              });
            }
          
            user.comparePassword(password, (err: any, isMatch: Boolean) => {
                if (err) {
                  return done(err);
                }
                if (isMatch) {
                  return done(null, user);
                }
                return done(null, false, { msg: "Invalid email or password." });
              });
        } catch (error) {
            return done(error);
        }
          
    })
  );

  passport.serializeUser((user: UserDocument, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: any, user: UserDocument) => done(err, user));
  });
};
