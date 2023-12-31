import express from "express";
import {ensureAuth} from '../Midleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) => {
  res.send('<h1>Hello</h1>');
});

export default router;