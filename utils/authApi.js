const withApiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(401).json({ error: "Unauthorized visitor" });
  } else {
    next();
  }
};

module.exports = withApiAuth
