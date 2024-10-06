import { Router } from "express";

import { getUser, createUser, login, getMe } from "../controllers/userController.js";

const router = Router();

router.post("/", createUser);
router.post("/login", login);

router.get("/me", getMe);
router.get("/:userId", getUser);

export default router;