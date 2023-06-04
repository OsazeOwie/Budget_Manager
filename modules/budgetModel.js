const mongoose = require("mongoose");

//Schema for storing expenses
const expenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true }
  });

const budgetSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    month: {
        type: Number,
        require: true,
    },
    year: {
        type: Number,
        require: true,
    },
    budgetAmount: {
        type: Number,
        required: true
    },
    expenses: [expenseSchema], // Array of expense objects
    exceeded: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Budget", budgetSchema);