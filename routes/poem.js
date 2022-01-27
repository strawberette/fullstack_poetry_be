const router = require("express").Router();

const Poem = require("../models/poem_structure");

router.post("/", async (req, res) => {
  await Poem.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
  res.status(201).json({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
});

router.get("/", async (req, res) => {
  const allPoems = await Poem.findAll();
  res.status(200).json(allPoems);
});

router.get("/:id", async (req, res) => {
  const poem = await Poem.findOne({ where: { id: req.params.id } });
  res.status(200).json({ poem });
});

router.put("/:id", async (req, res) => {
  await Poem.update(
    {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    },
    { where: { id: req.params.id } }
  );
  const poem = await Poem.findOne({ where: { id: req.params.id } });
  res.status(200).json({ poem });
});

router.delete("/:id", async (req, res) => {
  const poem = await Poem.findOne({ where: { id: req.params.id } });
  const deletedPoem = await poem.destroy();
  console.log(deletedPoem);
  res.status(200).json({ deletedPoem });
});

router.delete("/", async (req, res) => {
  const deletedPoems = await Poem.destroy({ where: {} });
  console.log(deletedPoems);
  res.status(200).json({ msg: `${deletedPoems} poems deleted!` });
});

module.exports = router;
