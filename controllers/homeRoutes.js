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

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_text", "user_id"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = postData.get({ plain: true });
    res.render("post", {
      ...posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/logout", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("dashboard");
    return;
  }

  res.render("signup");
});

router.get("*", (req, res) => {
  res.render("404");
  return;
});

module.exports = router;
