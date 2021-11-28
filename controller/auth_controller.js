let database = require("../database");
const passport = require("../middleware/passport");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dots = require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

  registerSubmit: async (req, res) => {
    let unsplashID = process.env.unsplashID;
    let endPoint = `https://api.unsplash.com/photos/random?client_id=${unsplashID}`;
    let { password, email, name } = req.body;
    name = email.split("@")[0];
    let role = "user";
    name = name.charAt(0).toUpperCase() + name.slice(1);

    const data = await fetch(endPoint);
    const jsonData = await data.json();
    let picture = jsonData.urls.thumb;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        res.redirect("/register");
      } else {
        const newUser = await prisma.user.create({
          data: { name, email, password, picture, role },
        });
        const welcomeReminder = await prisma.reminder.create({
          data: {
            title: "Welcome Reminder!",
            description:
              "Thank you for registering your account, this is just a welcome reminder!",
            completed: true,
            userId: newUser.id,
          },
        });
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authController;
