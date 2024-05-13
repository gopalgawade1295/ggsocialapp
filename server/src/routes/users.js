import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getUsers,
    updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/all/:id", verifyToken, getUsers);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.put("/edit/:id", verifyToken, updateUser)
export default router;
