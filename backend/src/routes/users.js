import { Router } from "express";

import { getUser, createUser, login, getMe, updateUserInfo } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.post("/", createUser);
router.post("/login", login);

router.patch('/', authenticateUser, updateUserInfo)

router.get("/me", updateUserInfo, getMe);
router.get("/:userId", getUser);

export default router;