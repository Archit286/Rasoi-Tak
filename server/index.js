import { MongoClient } from "mongodb";
import express, { json, urlencoded } from "express";
import cors from "cors";
import path from "path";
import { readFile } from "fs";
import { config } from "dotenv";
config();

//Add React
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import { StaticRouter } from "react-router-dom";

//database methods
import PostsDb from "./database/postsDb";
import PopularDb from "./database/popularDb";
import RecommendDb from "./database/recommendDb";
import UserDb from "./database/userDb";

//routes
import newPost from "./routes/newPost";
import allPosts from "./routes/allPosts";
import editPost from "./routes/editPost";
import popular from "./routes/popular";
import recommend from "./routes/recommend";
import login from "./routes/login";
import site from "./routes/site";

const app = express();
const port = process.env.PORT || 9000;
const MongoDbURI = process.env.MONGO_DB_URI;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/api/newPost", newPost);
app.use("/api/allPosts", allPosts);
app.use("/api/editPost", editPost);
app.use("/api/popular", popular);
app.use("/api/recommend", recommend);
app.use("/api/login", login);
app.use("/api/site", site);

//Static Files
app.use(express.static(path.join("server/uploads")));
app.use(express.static(path.join("build")));
app.get("/*", function (req, res) {
  readFile(
    path.resolve("./build/public/file/index.html"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Cannot find HTML file");
      }
      const context = {};
      const markup = ReactDOMServer.renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      );
      const html = data.replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div>`
      );
      return res.send(html);
    }
  );
});

//Uncaught Error Handling
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
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
