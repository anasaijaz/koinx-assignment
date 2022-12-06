import UserTxn from "../../models/UserTxn";
import BigNumber from 'bignumber.js'

const updateUserTxns = async (user_address, results) => {
  await UserTxn.updateOne({
      user_address: user_address
    }, {
      $set: {
        transactions: results
      }
    },
    {
      upsert: true
    })
}

const getUserBalance = async (user_address) => {
  const userTxns = await UserTxn.findOne({
    user_address
  })

  const txns = userTxns.transactions
  BigNumber.config({ ROUNDING_MODE: 2 })
  let balance = new BigNumber(0, 10)
  txns.forEach((txn) => {
    if(txn.isError) return;
    const isReceived = txn.to === user_address
    if(isReceived) {
      balance = balance.plus(new BigNumber(txn.value))
    } else {
      balance = balance.minus(new BigNumber(txn.value))
      balance = balance.minus((new BigNumber(txn.gasPrice)).multipliedBy(new BigNumber(txn.gasUsed)))
    }
  })

  return balance.dividedBy((new BigNumber(10)).pow(18)).toString()
}

export default {
  update: updateUserTxns,
  getBalance: getUserBalance
}
