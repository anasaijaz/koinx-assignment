# KoinX Assignment
A simple Node.js backend to explore blockchain 
- [x] API to fetch crypto transactions of a user
  ``/transaction/<user_address>``
- [x] Cron job to fetch ethereum every minutes
  ``/eth/price``
- [x] Calculate total balance of a user using previous transactions
``/transaction/balance/<user_address>``


* APIs only calculate balance using external transactions, any smart contract transfers will be ignored
may result in negative overall balance
