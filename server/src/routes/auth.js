import express from "express";
import { login, verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

export default router;
