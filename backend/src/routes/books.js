import express from "express";

import { authenticateUser } from "../middleware/auth.js";
import { create, getAll, getBook } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", authenticateUser, getAll)
router.get("/:id", authenticateUser, getBook)
router.post("/", authenticateUser, create)

export default router;