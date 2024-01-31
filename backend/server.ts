import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./config/database";
import mainRoutes from "./routes/main";

dotenv.config({ path: "./config/.env" });

//passport config
require("./config/passport")(passport);

app.use(cors());

//Connect to DB
connectDB();

//Static folder (not sure if needed)
app.use(express.static("public"));

//Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
      cookie: {
        sameSite: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.SESS_LIFETIME!)
      }
    })
);

// Passport middleware
app.use(passport.initialize());
//app.use(passport.session());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

app.listen(process.env.PORT , () => {
    console.log("Server is running, you better catch it!");
});