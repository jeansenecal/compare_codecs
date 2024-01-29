import passport from "passport";
import validator from "validator";
import User, { UserDocument } from "../models/User";
import { Request, Response } from "express";
import { IVerifyOptions } from "passport-local";


export const postSignup = async (req: Request, res: Response) => {
    if(req !== null && req.body !== null && req.body.email !== null && req.body.password !== null && req.body.confirmPassword !== null){
        const validationErrors = [];
        if (!validator.isEmail(req.body.email)){
            validationErrors.push({ msg: "Please enter a valid email address." });
        }
        if( req.body.password !== req.body.confirmPassword){
            validationErrors.push({msg: "Passwords do not match."});
          }
        if(!validationErrors.length){
            req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dots: false});
            const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            });
            const userExists = await User.findOne({email: req.body.email});
            if(userExists){
                validationErrors.push({msg: "An account with that email address already exists."});
            }else {
                try{
                    await user.save();
                } catch(err){
                    console.log(err);
                }
            }
        }
        if(validationErrors.length){
            res.send(validationErrors);
        }
    }
}

export const postLogin = async (req: Request, res: Response) => {
    if(req !== null && req.body !== null && req.body.email !== null && req.body.password !== null){
        const validationErrors = [];
        if (!validator.isEmail(req.body.email))
            validationErrors.push({ msg: "Please enter a valid email address." });
        if (validator.isEmpty(req.body.password))
            validationErrors.push({ msg: "Password cannot be blank." });
        
        if(!validationErrors.length){
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
                  console.log("User has logged in.");
                  return res.send({msg: "success"});
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
