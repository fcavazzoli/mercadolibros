import express from "express";

import { authenticateUser } from "../middleware/auth.js";
import { create, getAll, getBook, assingBook, updateBook, getBooksBySession, getOtherBooksBySession } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", authenticateUser, getAll)
router.get("/:id", authenticateUser, getBook)
router.get('/user/myBooks', authenticateUser, getBooksBySession)
router.get('/user/not-my-books', authenticateUser, getOtherBooksBySession)


router.patch('/:id', authenticateUser, updateBook)

router.post("/", authenticateUser, create)
router.post("/:id/assign", authenticateUser, assingBook)

export default router;