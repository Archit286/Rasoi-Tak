import { ObjectId } from "bson";
import e from "express";
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
      return { count: result.modifiedCount };
    } catch (e) {
      console.error(`Unable to update the post: ${e}`);
      return { error: e };
    }
  }
}

export default PopularDb;
