import axios from "axios";

const _api = axios.create({
  baseURL: "https://api.etherscan.io/api",
  params: {
    apikey: process.env.ETHER_SCAN_API_KEY,
  },
});

const getNormalTransactionsByUserAddress = async (userAddr) => {
  try {
    const res = await _api.get("/", {
      params: {
        module: "account",
        action: "txlist",
        address: userAddr,
        startblock: 0,
        offset: 10000,
        page: 1,
      },
    });

    const data = res.data;
    const { message, status, result } = data;

    console.log(result.length)
    return result.map(txn => ({
      from: txn.from,
      to: txn.to,
      value: txn.value,
      isError: (txn.isError === "1"),
      gas: txn.gas,
      gasPrice: txn.gasPrice,
      gasUsed: txn.gasUsed
    }));
  } catch (error) {
    console.error(error);
  }
};

export default {
  getTxns: getNormalTransactionsByUserAddress,
};
