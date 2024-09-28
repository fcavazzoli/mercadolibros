import { Router } from "express";

import { getUser } from "../controllers/userController.js";

const router = Router();

router.get("/:userId", getUser);

export default router;