const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { 
    getBudget,
    createBudget,
    updateBudget,
    deleteBudget,
 } = require("../controllers/budgetController");

router.use(validateToken);
router.get("/budgets", getBudget);
router.post("/create-budget", createBudget);
router.put("/update-budget/:id", updateBudget);
router.delete("/delete-budget/:id", deleteBudget);

module.exports = router;