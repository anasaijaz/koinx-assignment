import axios from 'axios'

const _api = axios.create({
  baseURL: 'https://api.etherscan.io/api',
  params: {
    apikey: process.env.ETHER_SCAN_API_KEY
  }
})

const getNormalTransactionsByUserAddress = async (userAddr) => {
  try {
    const res = await _api.get('/', {
      params: {
        module: 'account',
        action: 'txlistinternal',
        address: userAddr,
        startblock: 0,
        page: 1,
        sort: 'asc'
      }
    })

    const data = res.data
    const {
      message,
      status,
      result
    } = data

    return result
  } catch (error) {
    console.error(error)
  }
}

export default {
  getTxns: getNormalTransactionsByUserAddress
}


