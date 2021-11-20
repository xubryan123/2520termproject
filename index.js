const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: false }));
const passport = require("./middleware/passport");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("./middleware/checkAuth");
const { ensureAdmin } = require("./middleware/checkAdmin");

app.use(express.static(path.join(__dirname, "public")));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Middleware for express
app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post(
  "/reminder/update/:id",
  ensureAuthenticated,
  reminderController.update
);

// Implement this yourself
app.post(
  "/reminder/delete/:id",
  ensureAuthenticated,
  reminderController.delete
);
app.get("/admin/", ensureAdmin, reminderController.admin);
app.get("/admin/:session", reminderController.destroy);

app.get("/profile/settings", reminderController.settings)



// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", forwardAuthenticated, authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  }),
  authController.loginSubmit
);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
