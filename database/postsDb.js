const { ObjectId } = require("bson");
const e = require("express");
let posts;

class PostsDb {
  static async injectDb(conn) {
    if (posts) {
      return;
    }
    try {
      posts = await conn.db(process.env.MONGO_DB).collection("posts");
    } catch (e) {
      console.error(`Unable to establish a collection handle in postsDb: ${e}`);
    }
  }

  static async getAllPosts() {
    try {
      const result = await posts.find().sort({ date: 1 }).toArray();
      return result;
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }

  static async getPostById(id) {
    try {
      const result = await posts.find({ _id: ObjectId(id) });
      return result.toArray();
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }

  static async getPostByTitle(title) {
    try {
      const result = await posts.find({ title: title });
      return result.toArray();
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }

  static async getPostByTag(tag) {
    tag.forEach((element, index, arr) => {
      arr[index] = new RegExp(element, "i");
    });
    try {
      const result = await posts.find({ tags: { $in: tag } }).toArray();
      return result;
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }

  static async getLatestPosts() {
    const projection = { title: 1, image: 1 };
    try {
      const result = await posts
        .find()
        .sort({ date: 1 })
        .limit(8)
        .project(projection)
        .toArray();
      return result;
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }

  static async searchPosts(str) {
    posts.createIndex({ title: "text" });
    const query = { title: { $regex: new RegExp(str, "i") } };
    try {
      const result = await posts.find(query).sort({ date: 1 });
      return result.toArray();
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }

  static async addPost(newPost) {
    try {
      const result = await posts.insertOne(newPost);
      return result.insertedId;
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { error: "A post with the given title already exists." };
      }
      console.error(`Error occurred while adding new post, ${e}.`);
      return { error: e };
    }
  }

  static async updatePost(newPost, id) {
    const filter = { _id: ObjectId(id) };
    const updateDocument = {
      $set: { ...newPost },
    };
    try {
      const result = await posts.updateOne(filter, updateDocument);
      if (result.modifiedCount === 0) {
        throw 404;
      }
    } catch (e) {
      console.error("Post to be modified not found");
    }
  }

  static async deletePost(title) {
    try {
      const result = await posts.deleteOne({ title: title });
      if (result.deletedCount == 0) {
        throw 404;
      }
    } catch (e) {
      console.error("Post to be deleted not found");
    }
  }
}

module.exports = PostsDb;
