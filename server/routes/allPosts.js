import { Router } from "express";
import { existsSync, unlink } from "fs";
var router = Router();
import PostsDb from "../database/postsDb";

router.get("/", async (req, res) => {
  const result = await PostsDb.getAllPosts();
  res.send(result);
});

router.get("/:str", async (req, res) => {
  const result = await PostsDb.searchPosts(req.params.str);
  res.send(result);
});

router.delete("/:title", async (req, res) => {
  const link = "server/uploads/" + req.params.title + ".jpg";
  if (existsSync(link)) {
    unlink(link, (err) => {
      if (err) throw err;
    });
  }
  const data = await PostsDb.deletePost(req.params.title);
  if (data.count === 1) {
    res.send("Post deleted Successfully");
  } else {
    res.send("Post Could not be deleted");
  }
});
export default router;
