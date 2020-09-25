import { Router } from "express";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import UserDb from "../database/userDb";
var router = Router();

router.post("/", async (req, res) => {
  const user = req.body;
  const result = await UserDb.findUser(user);
  if (result.length === 1 && compareSync(user.password, result[0].password)) {
    const token = jwt.sign({ email: result[0].email }, process.env.JWT_KEY);
    res.header("xauthtoken", token).send({ status: true });
  } else {
    res.send({ status: false });
  }
});

export default router;
