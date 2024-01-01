const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const cors = require("cors");
const { connectDB } = require("./config/db");
require("./config/passport");
require("dotenv").config();
const postRoutes = require("./Routes/postRoutes");
const session = require("express-session");
const User = require("./Model/users");
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  session({
    secret: "sanwal12321",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.json());
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());

connectDB();

app.use("/auth", require("./Routes/auth"));
app.use("/", postRoutes);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: "http://localhost:3000/register",
  }),
  async (req, res) => {
    const { user } = req;
    try {
      const existingUser = await User.findOne({ email: user.email });
      //   console.log("Google Auth Callback - Profile:", profile);
      if (existingUser) {
        console.log("Existing user:", existingUser);
        const queryParams = new URLSearchParams();
        queryParams.append("email", user.email);
        queryParams.append("username", user.name.givenName);
        console.log(queryParams);
        return res.redirect(`http://localhost:3000/dashboard?${queryParams}`);
      } else {
        res.redirect("http://localhost:3000/register");
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
      // return done(error, false);
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
