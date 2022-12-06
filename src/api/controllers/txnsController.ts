import {
  NextFunction,
  Request,
  Response,
} from "express";
import etherScan from "../services/etherScan";
import createHttpError from "http-errors";
import userTxnServices from "../services/db/userTxnServices";

const getTxnsByUserAddress = async (req: Request, res: Response, next: NextFunction) => {
  const { user_address } = req.params;
  try {
    const results = await etherScan.getTxns(user_address);

    await userTxnServices.update(user_address, results)

    res.send(results);

  } catch (error) {
    console.trace(error)
    next(createHttpError(error))
  }
};


const getUserBalanceFromTxns = async (req: Request, res: Response, next: NextFunction) => {
  const { user_address } = req.params;
  try {
    const balance = await userTxnServices.getBalance(user_address);
    res.send({
      balance: balance
    });

  } catch (error) {
    console.trace(error)
    next(createHttpError(error))
  }
};


export default {
  get: getTxnsByUserAddress,
  getBalance: getUserBalanceFromTxns
};
