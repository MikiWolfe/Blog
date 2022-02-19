const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// Get users
router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by id
router.get("./:id", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_text"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!dbUserData) {
      res.status(404).json({ message: " No user found with this id." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new User
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log in
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!dbUserData) {
      res.status(400).json({
        message: "Incorrect user name or password. Please try again.",
      });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ user: dbUserData, message: "you are now logged in. Welcome!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("./logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
