import { Router } from "express";
var router = Router();
import PostsDb from "../database/postsDb";
import multer, { diskStorage } from "multer";

var storage = diskStorage({
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

export default router;
