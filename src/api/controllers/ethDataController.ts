import {
  NextFunction,
  Request,
  Response,
} from "express";
import createHttpError from "http-errors";
import ethPriceServices from "../services/db/ethPriceServices";

const getEthPrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const price = await ethPriceServices.get();
    res.send({
      inr_price: price
    });

  } catch (error) {
    console.trace(error)
    next(createHttpError(error))
  }
};

export default {
  get: getEthPrice,
};
