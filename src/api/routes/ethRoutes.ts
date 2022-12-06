import express from "express";
import txnsController from "../controllers/txnsController";
import ethDataController from "../controllers/ethDataController";
const router = express.Router();

router.get("/price", ethDataController.get);

export default router;
