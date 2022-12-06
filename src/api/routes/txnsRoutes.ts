import express from "express";
import txnsController from "../controllers/txnsController";
const router = express.Router();

router.get("/:user_address", txnsController.get);

export default router;
