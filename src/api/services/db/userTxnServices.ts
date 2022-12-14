import UserTxn from "../../models/UserTxn";
import BigNumber from 'bignumber.js'
import createHttpError from "http-errors";

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

  if(userTxns === null) throw createHttpError({stack: 404, message: 'User address not found in DB!  '})

  const txns = userTxns.transactions
  BigNumber.config({ ROUNDING_MODE: 2 })
  let balance = new BigNumber(0, 10)
  txns.forEach((txn) => {
    if(txn.isError) return;
    const isReceived = txn.to.toLowerCase() === user_address.toLowerCase()
    const isSent = txn.from.toLowerCase() === user_address.toLowerCase()

    if(isReceived) {
      balance = balance.plus(new BigNumber(txn.value))
    } else if(isSent) {
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
