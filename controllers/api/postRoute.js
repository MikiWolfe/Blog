const { Post } = require("../../models");
const router = require("express").Router();

// Create a post
router.post("/", async (req, res) => {
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

// Edit one post
router.put("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this ID" });
      return;
    }
    res.status(200).json(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
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
