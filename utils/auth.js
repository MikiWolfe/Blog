const withAuth = (reg, res, next) => {
  if (!reg.session.logged_id) {
    res.redirect(307,"/login");
  } else {
    next();
  }
};

module.exports = withAuth;
