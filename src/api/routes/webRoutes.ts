import express from "express";
import txnsRoutes from "./txnsRoutes";
import ethRoutes from "./ethRoutes";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    getTransactions: '/transaction/<user_address>',
    getEthPrice: '/eth/price',
    getBalance: '/transaction/balance/<user_address>'
  });
});

// User transaction routes
router.use("/transaction", txnsRoutes);

// Ethereum data routes
router.use("/eth", ethRoutes);

export default router;
