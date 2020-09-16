import { Router } from "express";
import { json } from "body-parser";
var router = Router();
var jsonParser = json();
import PostsDb from "../database/postsDb";
import PopularDb from "../database/popularDb";

router.get("/", async (req, res) => {
  const result = await PopularDb.getAllPosts();
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
  const data = await PopularDb.updatePost(newPost, req.body._id);
  if (data.count === 1) {
    res.send("Popular Posts Updated");
  } else {
    res.send("Popular Posts Update Failed");
  }
});

export default router;
