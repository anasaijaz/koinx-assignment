import express from 'express'
import txnsRoutes from "./txnsRoutes";

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Welcome to start point!');
});

router.use('/transaction', txnsRoutes)

export default router
