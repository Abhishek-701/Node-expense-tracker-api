const express = require('express')
const expenseController = require('../controllers/expenseController')
const router = express.Router()
const auth = require('../middleware/authMiddleware')

router.get('/expenses', auth,expenseController.getAllExpenses)
router.get('/expense/:id', expenseController.getExpense)
router.post('/expense', auth ,expenseController.addExpense)
router.patch('/expense/:id', expenseController.updateExpense)
router.delete('/expense/:id',expenseController.deleteExpense)


module.exports = router