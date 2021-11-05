const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
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

passport.serializeUser(function (user, done) {
  done(null, user["id"]);
}); //where session is created, user from localstrategy is sent here, able to access current user using req.user, user is entire userInfo object

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
