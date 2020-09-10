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

router.post("/", upload.any("photo"), async (req, res) => {
  if (req.body.video) {
    req.body.video = handleVideo(req.body.video);
  }
  let newPost = {
    ...req.body,
    image: "/" + req.body.title + ".jpg",
    date: Date.now(),
  };
  var result = {};
  if (req.body.title !== "") {
    result = await PostsDb.addPost(newPost);
  } else {
    result.count = 0;
  }
  if (result.count === 1) {
    res.send("Post added successfully");
  } else {
    res.send("Post Could not be added");
  }
});
function handleVideo(video) {
  let str = video.split('"');
  return str[5];
}

module.exports = router;
