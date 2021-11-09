module.exports = {
    ensureAdmin: function (req, res, next) {
        if (req.user.role === 'admin') {
            return next()
        }
      res.redirect("/login");
    },
  };