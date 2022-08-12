import express from "express";
import Google from "passport-google-oauth20";
import passport from "passport";
import cors from "cors";
import AuthRouter from "./routes/auth.js";
import dotenv from "dotenv";
import session, { Cookie } from "express-session";
import cookieParser from "cookie-parser";
//app
const app = express();
// app.use(cookieParser());
dotenv.config();
app.use(
  session({
    secret: "sadfs",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 100 * 24 },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", AuthRouter);
//passport setup
const GoogleStrategy = Google.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
