import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User, { UserDocument } from "../models/User";

module.exports = async function (passport: any) {
  passport.use(
    new LocalStrategy({ 
      usernameField: "email", 
      passwordField: "password", 
      session: false 
    }, async (email: string, password: string, done: any) => {
        try {
            const user: UserDocument | null = await User.findOne({ email: email.toLowerCase() });
          
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
  ),

  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false,
      },
      async (req, email: string, password: string, done) => {
        console.log(email);
  
        const user = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password
        });
        const userExists = await User.findOne({email: req.body.email});
        if(userExists){
            console.log('username or email already taken');
            return done(null, false, {
              message: 'username or email already taken',
            });
        }else {
          try{
              await user.save();
              return done(null, user);
          } catch(err){
            return done(err);
          }
        }
      },
    ),
  );
  
  passport.use(
    'jwt',
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: process.env.JWT_SECRET!
    }, (jwt_payload, done) => {
      try {
        User.findOne({ _id: jwt_payload.id })
        .then(user => {
          if (user) {
            console.log('user found in db in passport');
            done(null, user);
          } else {
            console.log(jwt_payload)
            console.log('user not found in db');
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );

  passport.serializeUser((user: UserDocument, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: any, user: UserDocument) => done(err, user));
  });
};
