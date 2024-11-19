import { Router } from "express";

import { proposeExchage, getMyProposals, getMyAsks, acceptExchange, rejectExchange } from "../controllers/exchagesController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.post("/", authenticateUser, proposeExchage);

router.patch(`/:exchangeId/accept`, authenticateUser, acceptExchange)
router.patch(`/:exchangeId/decline`, authenticateUser, rejectExchange)

router.get('/myProposals', authenticateUser, getMyProposals)
router.get('/askedToMe', authenticateUser, getMyAsks)


export default router;