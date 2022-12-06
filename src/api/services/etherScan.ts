import axios from "axios";
import createHttpError from "http-errors";

const _api = axios.create({
  baseURL: "https://api.etherscan.io/api",
});

const getNormalTransactionsByUserAddress = async (userAddr) => {
    const res = await _api.get("/", {
      params: {
        module: "account",
        action: "txlist",
        address: userAddr,
        startblock: 0,
        offset: 10000,
        page: 1,
        apikey: process.env.ETHER_SCAN_API_KEY,
      },
    });

    const data = res.data;
    const { message, status, result } = data;
    if(status !== '1') throw createHttpError({stack: 408, message: 'Rate limit exceeded'})

    return result.map(txn => ({
      from: txn.from,
      to: txn.to,
      value: txn.value,
      isError: (txn.isError === "1"),
      gas: txn.gas,
      gasPrice: txn.gasPrice,
      gasUsed: txn.gasUsed
    }));
};

export default {
  getTxns: getNormalTransactionsByUserAddress,
};
