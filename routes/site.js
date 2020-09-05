const express = require("express");
const popularDb = require("../database/popularDb");
const postsDb = require("../database/postsDb");
const recommendDb = require("../database/recommendDb");
var router = express.Router();

router.get("/", async (req, res) => {
  const pop = await popularDb.getAllPosts();
  const rec = await recommendDb.getAllPosts();
  const latest = await postsDb.getLatestPosts();
  const data = { popular: pop, recommend: rec, latest: latest };
  res.send(data);
});

router.get("/allpost", async (req, res) => {
  const result = await postsDb.getAllPosts();
  res.send(result);
});

router.get("/post/:id", async (req, res) => {
  const result = await postsDb.getPostById(req.params.id);
  res.send(result);
});

function handleArr(arr) {
  return arr.split(",");
}

router.get("/tags/:tag", async (req, res) => {
  const arr = handleArr(req.params.tag);
  const result = await postsDb.getPostByTag(arr);
  res.send(result);
});

router.get("/search/:str", async (req, res) => {
  const title = new RegExp(req.params.str, "i");
  const result1 = await postsDb.getPostByTitle(title);
  const result2 = await postsDb.getPostByTag([req.params.str]);
  const result = [...result1, ...result2];
  res.send(result);
});

module.exports = router;
