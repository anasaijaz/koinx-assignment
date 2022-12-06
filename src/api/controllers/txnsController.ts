import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import etherScan from "../services/etherScan";

const getTxnsByUserAddress = async (req: Request, res: Response) => {
  const { user_address } = req.params;
  try {
    const results = await etherScan.getTxns(user_address);
    res.send(results);
  } catch (error) {}
};

export default {
  get: getTxnsByUserAddress,
};
