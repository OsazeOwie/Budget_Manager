const asyncHandler = require("express-async-handler");
const BudgetSchema = require("../modules/budgetModel");


const getBudget = asyncHandler(async (req, res) => {
    const budget = await BudgetSchema.find({ user_id: req.user.id })
    res.json(budget)
})

const createBudget = asyncHandler(async (req, res) => {
    const { month, year, budgetAmount, } = req.body;
    if (!month || !year || !budgetAmount) {
        res.status(400);
        throw new Error("Please fill in month, year, and budgetAmount");
    }

    const existingBudget = await BudgetSchema.findOne({ user_id: req.user.id, month, year, budgetAmount })
    if (existingBudget) {
        res.status(409);
        throw new Error("Budget already exists");
    }

    const budget = await BudgetSchema.create({
        user_id: req.user.id,
        month,
        year,
        budgetAmount
    })
    if (!budget) {
        throw new Error("Budget was not created, please try again")
    }
    res.json(budget)

})

const updateBudget = asyncHandler(async (req, res) => {
    const budgetId = req.params.id
    const { expenses } = req.body

    if (!expenses){
        res.status(400)
        throw new Error("Please add your expenses")
    }

    if (!budgetId.length === 24) {
        res.status(400)
        throw new Error("budgetId should be of 24 characters")
    }

    const budget = await BudgetSchema.findById(budgetId);

    if (!budget) {
        res.status(404);
        throw new Error("Budget not found");
    }

    // Calculate the total expenses
    let totalExpenses = 0;

    // Update expenses with the provided data
    const previousExpenses = new Map(budget.expenses);

    // Update expenses with the provided data
    Object.keys(expenses).forEach((expenseKey) => {
        const expenseAmount = expenses[expenseKey];
        console.log("Expense Key:", expenseKey);
        console.log("Expense Amount:", expenseAmount);
        budget.expenses.set(expenseKey, expenseAmount);
        totalExpenses += expenseAmount;
    });

    // Add previous expenses to the total
    previousExpenses.forEach((expenseAmount) => {
        totalExpenses += expenseAmount;
    });

    const currentBudget = budget.budgetAmount - totalExpenses

    const exceeded = totalExpenses > budget.budgetAmount;

    budget.exceeded = exceeded;
    budget.markModified('expenses');
    await budget.save();

    res.json({ totalExpenses: totalExpenses, exceeded: exceeded, budget: budget.budgetAmount, currentBudget });
})

const deleteBudget = asyncHandler(async (req, res) => {
    const budgetId = req.params.id
    console.log(budgetId.length);

    if (!(budgetId.length === 24)) {
        res.status(400)
        throw new Error("The budgetId should be of 24 strings")
    }

    const deleteBudget = await BudgetSchema.findByIdAndDelete({ _id: budgetId })
    if (!deleteBudget) {
        res.status(404)
        throw new Error("The budget you are trying to delete does not exist")
    }

    res.json({ message: "budget deleted", deleteBudget })
})

module.exports = {
    getBudget,
    createBudget,
    updateBudget,
    deleteBudget
}