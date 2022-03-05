const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll();
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("post", {
    layout: "dashboard",
    posts,
    logged_in: req.session.logged_in,
  });
});

router.get("/post", withAuth, (req, res) => {
  res.render("post", {
    layout: "dashboard",
    logged_in: req.session.logged_in,
  });
});

router.get("/edit/:id", async (req, res) => {
    try {
const postData = await Post.findByPk(req.params.id)
const posts = postData.get({ plain : true})
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;
