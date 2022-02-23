const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: {
      model: User,
      attributes: { include: ["username"] },
    },
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("homepage", {
    posts,
    logged_in: req.session.logged_in,
  });
});

router.get("/", async (req, res) => {
  const commentData = await Comment.findAll();
  const comments = commentData.map((comment) => comment.get({ plain: true }));
  res.render("homepage", {
    comments,
    logged_in: req.session.logged_in,
  });
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

router.get("*", (req, res) => {
  res.redirect("/404");
  return;
});

module.exports = router;
