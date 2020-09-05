const { ObjectId } = require("bson");
const e = require("express");
let popular;

class PopularDb {
  static async injectDb(conn) {
    if (popular) {
      return;
    }
    try {
      popular = await conn.db(process.env.MONGO_DB).collection("popular");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in popularDb: ${e}`
      );
    }
  }

  static async getAllPosts() {
    try {
      const result = await popular.find().toArray();
      return result;
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }

  static async updatePost(newPost, id) {
    const filter = { _id: ObjectId(id) };
    const updateDocument = {
      $set: { ...newPost },
    };
    try {
      const result = await popular.updateOne(filter, updateDocument);
      if (result.modifiedCount === 0) {
        throw 404;
      }
    } catch (e) {
      console.error("Post to be modified not found");
    }
  }
}

module.exports = PopularDb;
