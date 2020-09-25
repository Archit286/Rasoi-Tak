let users;

class UserDb {
  static async injectDb(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.MONGO_DB).collection("users");
    } catch (e) {
      console.error(`Unable to establish a collection handle in userDb: ${e}`);
    }
  }

  static async findUser(user) {
    try {
      const result = await users.find({
        email: user.email,
      });
      return result.toArray();
    } catch (e) {
      console.error(`Error occurred while searching for posts, ${e}.`);
      return { error: e };
    }
  }
}

export default UserDb;
