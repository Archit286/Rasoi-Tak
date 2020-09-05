const { ObjectId } = require("bson");
const e = require("express");
let recommend;

class RecommendDb {
  static async injectDb(conn) {
    if (recommend) {
      return;
    }
    try {
      recommend = await conn.db(process.env.MONGO_DB).collection("recommend");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in  recommendDb: ${e}`
      );
    }
  }

  static async getAllPosts() {
    try {
      const result = await recommend.find().toArray();
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
      const result = await recommend.updateOne(filter, updateDocument);
      if (result.modifiedCount === 0) {
        throw 404;
      }
    } catch (e) {
      console.error("Post to be modified not found");
    }
  }
}

module.exports = RecommendDb;
