const router = require("express").Router();
const { User, Comment, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        logged_id: req.session.logged_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("all-posts", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/post", withAuth, async (req, res) => {
 try { res.render("post", {
    layout: "dashboard",
  });
} catch (err) {
    res.redirect("404")
}
});


module.exports = router