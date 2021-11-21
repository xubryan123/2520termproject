let database = require("../database");
const passport = require("../middleware/passport");

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
    let length = Object.keys(database.userInfo).length;
    let name = req.body.email.split("@")[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let newUser = {
      id: length + 1,
      name: name,
      email: req.body.email,
      password: req.body.password,
    };
    database.userInfo[name] = newUser;
    res.redirect("/login");
  },
};

module.exports = authController;
