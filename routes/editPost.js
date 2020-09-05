const express = require("express");
var router = express.Router();
const PostsDb = require("../database/postsDb");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.title + ".jpg");
  },
});
var upload = multer({ storage: storage });

router.get("/:id", async (req, res) => {
  const result = await PostsDb.getPostById(req.params.id);
  res.send(result[0]);
});

router.put("/:id", upload.any("photo"), async (req, res) => {
  if (req.body.video.startsWith("<iframe")) {
    req.body.video = handleVideo(req.body.video);
  }
  let newPost = {
    ...req.body,
    image: process.env.MY_URL + req.body.title + ".jpg",
    date: Date(),
  };
  await PostsDb.updatePost(newPost, req.params.id);
});

function handleVideo(video) {
  let str = video.split('"');
  return str[5];
}

module.exports = router;
