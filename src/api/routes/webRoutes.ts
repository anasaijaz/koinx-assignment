import express from "express";
import txnsRoutes from "./txnsRoutes";
import ethRoutes from "./ethRoutes";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to start point!");
});

// User transaction routes
router.use("/transaction", txnsRoutes);

// Ethereum data routes
router.use("/eth", ethRoutes);

export default router;
