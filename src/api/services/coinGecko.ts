import axios from "axios";

const _api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/simple/",
});

const getEthereumPrice = async () => {
  try {
    const res = await _api.get("/price", {
      params: {
        ids: 'ethereum',
        vs_currencies: 'inr'
      },
    });

    const data = res.data;
    const { ethereum } = data;

    return ethereum.inr;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getPrice: getEthereumPrice,
};
