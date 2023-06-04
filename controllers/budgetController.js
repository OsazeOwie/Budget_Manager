const asyncHandler = require("express-async-handler");
const BudgetSchema = require("../modules/budgetModel");
const mongoose = require("mongoose")


const getBudget = asyncHandler( async (req, res) => {
    const budget = await BudgetSchema.find({ user_id: req.user.id })
    res.json(budget)
})

const createBudget = asyncHandler( async (req, res) => {
    const { month, year, budgetAmount, } = req.body;
    if( !month || !year || !budgetAmount) {
        res.status(400);
        throw new Error("Please fill in month, year, and budgetAmount");
    }

    const existingBudget = await BudgetSchema.findOne({ user_id: req.user.id, month, year })
    if (existingBudget) {
        res.status(409)
        throw new Error("Budget plan already exists")
    }

    const budget = await BudgetSchema.create({
        user_id: req.user.id,
        month,
        year,
        budgetAmount
    })
    if(budget){
        res.status(201).json(budget)
    }else{
        throw new Error("Budget not created, please try again");
    }
    
})

const updateBudget = asyncHandler( async (req, res) => {
    const budgetId = req.params.id

    const budget = await BudgetSchema.findOne({ _id:budgetId })
    res.json(budget)

    // const { expenses } = req.body

    // const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)

    // const exceeded = totalExpenses > updatedBudget.budgetAmount

    // const updatedBudget = await BudgetSchema.updateOne(
    //     { _id: budgetId},
        // {
        //     $set: {
        //         expenses,
        //         exceeded
        //     }
        // }
        // )

    // if(!updateBudget) {
    //     res.status(404)
    //     throw new Error("Budget does not exist")
    // }

    // res.json("budget updated: ",updatedBudget)
})

const deleteBudget = asyncHandler( async (req, res) => {
    res.json({message:"budget deleted"})
})

module.exports = {
    getBudget,
    createBudget,
    updateBudget,
    deleteBudget
}