const router = require("express").Router();
const passport = require("passport");
const session = { session: false };

const Poem = require("../models/poem_structure");
const User = require("../models/user");

router.post("/", passport.authenticate("jwt", session), async (req, res) => {
  if (req.user.id !== parseInt(req.body.userId)) {
    return res
      .status(403)
      .json({ message: "You are not authorised to access this" });
  }
  await Poem.create({
    title: req.body.title,
    content: req.body.content,
    UserId: req.body.userId,
  });
  res.status(201).json({
    title: req.body.title,
    content: req.body.content,
    UserId: req.body.userId,
  });
});

router.get("/", async (req, res) => {
  const allPoems = await Poem.findAll({
    include: { model: User },
  });
  allPoems.map((p) => {
    return (p.User.passwordHash = undefined);
  });
  res.status(200).json(allPoems);
});

router.get("/:id", async (req, res) => {
  const poem = await Poem.findOne(
    // { where: { id: req.params.id } },
    {
      include: { model: User },
      where: { id: req.params.id },
    }
  );
  poem.User.passwordHash = undefined;
  res.status(200).json({ poem });
});

router.put("/:id", passport.authenticate("jwt", session), async (req, res) => {
  let poem = await Poem.findOne({ where: { id: req.params.id } });
  if (req.user.id !== poem.UserId) {
    return res
      .status(403)
      .json({ message: "You are not authorised to access this" });
  }

  await Poem.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    { where: { id: req.params.id } }
  );
  poem = await Poem.findOne({ where: { id: req.params.id } });
  res.status(200).json({ poem });
});

router.delete(
  "/:id",
  passport.authenticate("jwt", session),
  async (req, res) => {
    const poem = await Poem.findOne({ where: { id: req.params.id } });
    if (req.user.id !== poem.UserId) {
      return res
        .status(403)
        .json({ message: "You are not authorised to access this" });
    }
    const deletedPoem = await poem.destroy();
    res.status(200).json({ deletedPoem });
  }
);

module.exports = router;
