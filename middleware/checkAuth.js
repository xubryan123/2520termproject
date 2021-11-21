module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/login");
    },
    forwardAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/reminders");
    },
    // isAdmin: function (req, res, next) {
    //   if
    // }
  };

  //unsplash profile image in return object
  //multer to reassemble chunks
  //use imgur
  