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
  req.body.video = handleVideo(req.body.video);
  let newPost = {
    ...req.body,
    image: "/" + req.body.title + ".jpg",
    date: Date(),
  };
  if (req.body.title !== "") {
    await PostsDb.addPost(newPost);
  }
});

function handleVideo(video) {
  let str = video.split('"');
  return str[5];
}

module.exports = router;
