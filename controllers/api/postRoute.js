const { Post, Comment, User } = require("../../models");
const router = require("express").Router();
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/authApi");
const { route } = require(".");

// Get all posts with data
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "post_text"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one post by ID returned with data
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "post_text"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
        },
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post with that ID found." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("./", withAuth, async (req, res) => {
  try {
    if (req.session) {
      const dbPostData = await Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id,
      });

      res.status(200).json(dbPostData, { message: "New post saved!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("./:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update({
      where: {
        title: req.body.title,
        post_text: req.body.post_text,
      },
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this ID" });
      return;
    }
    res.status(200).json(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("./:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this ID" });
      return;
    }
    res.status(200).json(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
