import { Router } from "express";
import UserDb from "../database/userDb";
var router = Router();

router.get("/:username/:password", async (req, res) => {
  const user = req.params;
  const result = await UserDb.findUser(user);
  if (result.length) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});

export default router;
