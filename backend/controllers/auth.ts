import passport from "passport";
import validator from "validator";
import User, { UserDocument } from "../models/User";
import { NextFunction, Request, Response } from "express";
import { IVerifyOptions } from "passport-local";
import jwt from 'jsonwebtoken';

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    if(req !== null && req.body !== null && req.body.email !== null && req.body.password !== null && req.body.confirmPassword !== null){
        if (!validator.isEmail(req.body.email)){
            res.status(400).send({ message: "Please enter a valid email address." });
        }
        else if( req.body.password !== req.body.confirmPassword){
            res.status(400).send({ message: "Passwords do not match."});
          }
        else {
            req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dots: false});
            passport.authenticate('register', (err: Error, user: UserDocument, info: IVerifyOptions) => {
                if (err) {
                  console.error(err);
                }
                if (info !== undefined) {
                  console.error(info.message);
                  res.status(403).send(info.message);
                } else {
                    req.logIn(user, (err) => {
                        if (err) {
                          console.log(err);
                          return res.send(err);
                        }
                        const token: string = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
                          expiresIn: 86400,
                        });
                        console.log("User created");
                        res.status(200).send({
                          auth: true,
                          token,
                          message: 'user created & logged in',
                        });
                    });
                }
              })(req, res, next);
        }
    }
}

export const postLogin = async (req: Request, res: Response) => {
    if(req !== null && req.body !== null && req.body.email !== null && req.body.password !== null){
        if (!validator.isEmail(req.body.email))
            res.status(400).send({ message: "Please enter a valid email address." });
        else if (validator.isEmpty(req.body.password))
            res.status(400).send({ message: "Password cannot be blank." });   
        else {
            req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
            passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }
                if (!user) {
                    console.log(info);
                    return res.send(info);
                }
                req.logIn(user, (err) => {
                  if (err) {
                    console.log(err);
                    return res.send(err);
                  }
                  const token: string = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
                    expiresIn: 86400,
                  });
                  console.log("User has logged in.");
                  res.status(200).send({
                    auth: true,
                    token,
                    message: 'user found & logged in',
                  });
                });
              })(req, res);
        }
    }
}

export const logout = (req: Request, res: Response) => {
    req.logout((err) => {
        console.log('User has logged out.');
      });
}
