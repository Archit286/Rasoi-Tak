const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
var jsonParser = bodyParser.json();
const PostsDb = require("../database/postsDb");
const RecommendDb = require("../database/recommendDb");

router.get("/", async (req, res) => {
  const result = await RecommendDb.getAllPosts();
  res.send(result);
});

router.get("/title/:title?", async (req, res) => {
  if (req.params.title) {
    const result = await PostsDb.getPostByTitle(req.params.title);
    res.send(result);
  } else {
    res.send([]);
  }
});

router.put("/", jsonParser, async (req, res) => {
  const newPost = {
    post_id: req.body.post_id,
    title: req.body.title,
    image: req.body.photo,
  };
  const data = await RecommendDb.updatePost(newPost, req.body._id);
  if (data.count === 1) {
    res.send("Recommended Posts updated");
  } else {
    res.send("Recommended Posts update failed");
  }
});

module.exports = router;
