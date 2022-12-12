const express = require('express')
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionController')


// router object
const router = express.Router()

// router

// add transaction post method
router.post('/add_transaction', addTransaction )

// edit transaction post method
router.post('/edit_transaction', editTransaction )

// delete transaction post method
router.post('/delete_transaction', deleteTransaction )

// get transaction
router.post('/get_transaction', getAllTransaction)

module.exports = router