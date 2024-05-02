const mongoose = require('mongoose')

const categoryOptions = ['food','utilities','fuel','recreation','shopping','general']

const expenseSchema = new mongoose.Schema({
    amount:{
        type : Number,
        required : true,
    },
    description: {
        type: String,
        required : true,
        default : "Not Mentioned"
    },
    category:{
        type: String,
        enum: categoryOptions,
        default: 'general'
    },
},{
    timestamps:true
}) 

const Expense = mongoose.model('Expense',expenseSchema)

module.exports = Expense