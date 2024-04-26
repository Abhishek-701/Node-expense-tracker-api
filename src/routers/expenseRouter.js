const express = require('express')
const expenseController = require('../controllers/expenseController')
const router = express.Router()

router.get('/expenses', expenseController.getAllExpenses)
router.get('/expense/:id', expenseController.getExpense)
router.post('/expense', expenseController.addExpense)
router.patch('/expense/:id', expenseController.updateExpense)
router.delete('/expense/:id',expenseController.deleteExpense)


module.exports = router