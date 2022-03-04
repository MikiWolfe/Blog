const { Comment } = require("../../models");
const router = require("express").Router();

// create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    if (req.session) {
      const dbCommentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.status(200).json(dbCommentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//  Update comment
router.put("/:id", async (req, res) => {
  try {
    if (req.session) {
      const dbCommentData = await Comment.update(
        {
          comment_text: req.body.comment_text,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(dbCommentData);
    } else if (!dbCommentData) {
      res.status(404).json({ message: "No comment with this ID" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete comments
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbCommentData) {
      res.status(404).json({ message: "No comment found with that ID" });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
