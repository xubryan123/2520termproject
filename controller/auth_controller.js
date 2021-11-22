let database = require("../database");
const passport = require("../middleware/passport");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dots = require("dotenv").config();


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    pass;
  },

  registerSubmit: (req, res) => {
    let unsplashID = process.env.unsplashID;
    let endPoint = `https://api.unsplash.com/photos/random?client_id=${unsplashID}`;
    let length = Object.keys(database.userInfo).length;
    let name = req.body.email.split("@")[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    fetch(endPoint)
      .then((data) => data.json())
      .then((data) => {
        let picture = data.urls.thumb;
        let newUser = {
          id: length + 1,
          name: name,
          email: req.body.email,
          password: req.body.password,
          picture: picture,
          role: "user",
        };
        database.userInfo[name] = newUser;
        let welcomeReminder = {
          id: 1,
          title: "Welcome Reminder",
          description:
            "Thank you for registering your account, this is just a welcome reminder!",
          completed: true,
        };

        database.Database[name] = { reminders: [welcomeReminder] };
        res.redirect("/login");
      });
  },
};

module.exports = authController;
