import PostsDb from "../database/postsDb";
import { Router } from "express";
import multer, { diskStorage } from "multer";
var router = Router();

var storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/uploads/");
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
    image: "/" + req.body.title + ".jpg",
    date: Date.now(),
  };
  const data = await PostsDb.updatePost(newPost, req.params.id);
  if (data.count === 1) {
    res.send("Post Updated Successfully");
  } else {
    res.send("Post Could not be Updated");
  }
});

function handleVideo(video) {
  let str = video.split('"');
  return str[5];
}

export default router;
