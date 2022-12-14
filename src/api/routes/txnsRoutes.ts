import express from "express";
import txnsController from "../controllers/txnsController";
const router = express.Router();

router.get("/:user_address", txnsController.get);
router.get('/balance/:user_address', txnsController.getBalance)

export default router;
