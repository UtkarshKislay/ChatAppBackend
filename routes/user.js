

import express from "express";
import { ensureAuth } from "../Midleware/auth.js";

const router = express.Router();

router.get('/profile',ensureAuth, async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      return res.status(200).json("USER exist");
    } else {
      return res.status(200).json("USER no exitst");
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
