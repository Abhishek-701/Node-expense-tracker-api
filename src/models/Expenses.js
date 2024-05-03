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
    owner:{
        type : mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps:true
}) 

const Expense = mongoose.model('Expense',expenseSchema)

module.exports = Expense