import express from "express";

import { authenticateUser } from "../middleware/auth.js";
import { create, getAll, getBook, assingBook, updateBook } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", authenticateUser, getAll)
router.get("/:id", authenticateUser, getBook)

router.patch('/:id', authenticateUser, updateBook)

router.post("/", authenticateUser, create)
router.post("/:id/assign", authenticateUser, assingBook)

export default router;