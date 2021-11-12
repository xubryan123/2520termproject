let database = require("../database").Database;
const session = require("express-session");

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
    let user = req.user.name;
    // if (database[user].reminders.length === 0) {
    //   res.render("reminder/index");
    // }
    res.render("reminder/index", { reminders: database[user].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let user = req.user.name;
    let reminderToFind = req.params.id;
    let searchResult = database[user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[user].reminders });
    }
  },

  create: (req, res) => {
    let user = req.user.name;
    let reminder = {
      id: database[user].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[user].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let user = req.user.name;
    let reminderToFind = req.params.id;
    let searchResult = database[user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let user = req.user.name;
    let updatedReminder = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: Boolean(req.body.completed),
    };
    let searchResult = database[user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let index = database[user].reminders.indexOf(searchResult);
    database[user].reminders.splice(index, 1, updatedReminder);
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let user = req.user.name;
    database[user].reminders = database[user].reminders.filter(
      (element) => element.id != reminderToFind
    );
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
