import express from "express";

import { authenticateUser } from "../middleware/auth.js";
import { create, getAll, getBook, assingBook, updateBook, getBooksBySession, deleteUserBook } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", authenticateUser, getAll)
router.get("/:id", authenticateUser, getBook)
router.get('/user/myBooks', authenticateUser, getBooksBySession)


router.patch('/:id', authenticateUser, updateBook)

router.post("/", authenticateUser, create)
router.post("/:id/assign", authenticateUser, assingBook)

router.delete('/userBook/:id', authenticateUser, deleteUserBook)

export default router;