
const Expense = require('../models/Expenses')

//Get All Expenses Controller
const getAllExpenses = async (req,res) => {
    try {
        const expenses = await Expense.find()
        res.status(200).json({ expenses })
    } catch (e) {
        res.status(500).json({ error : 'Server Error'})
    }
}

const getExpense = async (req, res) => {
    try {
        const expense= await Expense.findOne({ _id: req.params.id})
        if(!expense){
            res.status(404).json({ error: 'Not Found' })
        }

        res.status(200).json({ expense })
    } catch (e) {
        res.status(500).send()
    }
}

const addExpense = async (req,res) => {
    try{
        const expense = req.body
        await Expense.create(expense)
        res.status(201).json({ expense })
    }catch(e){
        res.status(500).json({ error: 'Something went wrong '})
    }
}

const updateExpense = async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['amount','description','category']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        res.status(404).json({ error : 'Invalid Updates' })
    }

    try {
        const expense = await Expense.findOne({ _id: req.params.id })

        if(!expense){
            res.status(404).json({ error: 'Expense not found' })
        }

        updates.forEach((update)=> expense[update] = req.body[update])
        await expense.save()
        res.status(200).json({ expense })

    } catch (e) {
        res.status(500).send()
    }
}

const deleteExpense = async (req,res) => {
    try{
        const expense = await Expense.findByIdAndDelete( {_id: req.params.id })

        if(!expense){
            return res.status(404).send()
        }
        
        res.status(200).json({ expense })

    }catch(e){
        res.status(500).send()
    }
}

module.exports = {
    getAllExpenses,
    addExpense,
    updateExpense,
    getExpense,
    deleteExpense
}