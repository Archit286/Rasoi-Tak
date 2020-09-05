const express = require("express");
const cors = require("cors");
const path = require("path");
const { MongoClient } = require("mongodb");
require("dotenv").config();

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
  });

//database methods
const PostsDb = require("./database/postsDb");
const PopularDb = require("./database/popularDb");
const RecommendDb = require("./database/recommendDb");
const UserDb = require("./database/userDb");
//routes
var newPost = require("./routes/newPost");
var allPosts = require("./routes/allPosts");
var editPost = require("./routes/editPost");
var popular = require("./routes/popular");
var recommend = require("./routes/recommend");
var login = require("./routes/login");
var site = require("./routes/site");

const app = express();
const port = process.env.PORT || 9000;
const MongoDbURI = process.env.MONGO_DB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/newPost", newPost);
app.use("/api/allPosts", allPosts);
app.use("/api/editPost", editPost);
app.use("/api/popular", popular);
app.use("/api/recommend", recommend);
app.use("/api/login", login);
app.use("/api/site", site);

//Static Files
app.use(express.static("uploads"));
app.use(express.static(path.join(__dirname, "react/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "react/build", "index.html"));
});

//Mongo Connection
MongoClient.connect(MongoDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await PostsDb.injectDb(client);
    await PopularDb.injectDb(client);
    await RecommendDb.injectDb(client);
    await UserDb.injectDb(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
