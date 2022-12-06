import coinGecko from "../coinGecko";
import client from "../../../config/redis";

const updateEthPrice = async () => {
  const inr_price = await coinGecko.getPrice()

  // Updating the price of ethereum
  await client.set('ETH_PRICE', inr_price)
}

const getEthPrice = async () => {
  const inr_price = await client.get('ETH_PRICE')
  return inr_price
}

export default {
  update: updateEthPrice,
  get: getEthPrice
}
