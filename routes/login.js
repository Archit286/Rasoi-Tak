const express = require("express");
const UserDb = require("../database/userDb");
var router = express.Router();

router.get("/:username/:password", async (req, res) => {
  const user = req.params;
  const result = await UserDb.findUser(user);
  if (result.length) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});

module.exports = router;
