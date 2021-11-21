const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GitHubStrategy = require('passport-github2').Strategy;
const process = require("process");
const dots = require("dotenv").config();

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        }); //same as if else statement, ternary operator, done sends us back to passport.authenticate, user is entire userInfo object
  }
);

let githubLogin = new GitHubStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:3001/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // console.log(profile)
  let user = userController.getUserByGithubIdOrCreate(profile)
  // console.log(user)
  return done(null, user)
}
);

passport.serializeUser(function (user, done) {
  // console.log(user)
  done(null, user);
}); //where session is created, user from localstrategy is sent here, able to access current user using req.user, user is entire userInfo object

passport.deserializeUser(function (returning, done) {
  let user = userController.getUserById(returning.id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin).use(githubLogin);
