let database = require("../database").Database;
let userInfo = require("../database").userInfo;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let remindersController = {
  settings: (req, res) => {
    res.render("auth/settings");
  },

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

  list: async (req, res) => {
    let id = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { reminders: true },
    });

    res.render("reminder/index", {
      reminders: user.reminders,
      picture: user.picture,
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let id = req.user.id;
    let reminderToFind = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { reminders: true },
    });

    const reminder = await prisma.reminder.findUnique({
      where: {
        id: reminderToFind,
      },
    });

    if (reminder != undefined) {
      res.render("reminder/single-reminder", { reminderItem: reminder });
    } else {
      res.render("reminder/index", {
        reminders: user.reminders,
        picture: user.picture,
      });
    }
  },

  create: async (req, res) => {
    let id = req.user.id;
    let { title, description } = req.body;

    await prisma.reminder.create({
      data: {
        title: title,
        description: description,
        completed: false,
        userId: id,
      },
    });

    res.redirect("/reminders");
  },

  edit: async (req, res) => {
    let reminderToFind = parseInt(req.params.id);

    const reminder = await prisma.reminder.findUnique({
      where: {
        id: reminderToFind,
      },
    });

    res.render("reminder/edit", { reminderItem: reminder });
  },

  update: async (req, res) => {
    let reminderToFind = parseInt(req.params.id);

    let { title, description, completed } = req.body;

    if (completed == "true") {
      completed = true;
    } else {
      completed = false;
    }

    await prisma.reminder.update({
      where: {
        id: reminderToFind,
      },
      data: {
        title: title,
        description: description,
        completed: completed,
      },
    });

    res.redirect("/reminders");
  },

  delete: async (req, res) => {
    let reminderToFind = parseInt(req.params.id);

    await prisma.reminder.delete({
      where: {
        id: reminderToFind,
      },
    });

    res.redirect("/reminders");
  },
};

module.exports = remindersController;
