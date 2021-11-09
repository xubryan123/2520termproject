let database = require("../database").Database;
// const session = require("express-session");

let remindersController = {
  destroy: (req, res) => {
    let Session = req.params.session;
    req.sessionStore.destroy(Session);
    res.redirect("/admin");
  },

  admin: (req, res) => {
    req.sessionStore.all((err, session) => {
      res.render("auth/admin", { sessions: session });

      if (err) {
        console.log(err);
      }
    });
  },

  list: (req, res) => {
    res.render("reminder/index", { reminders: database.Cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.Cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.Cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.Cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.Cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.Cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let updatedReminder = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: Boolean(req.body.completed),
    };
    let searchResult = database.Cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let index = database.Cindy.reminders.indexOf(searchResult);
    database.Cindy.reminders.splice(index, 1, updatedReminder);
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    database.Cindy.reminders = database.Cindy.reminders.filter(
      (element) => element.id != reminderToFind
    );
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
