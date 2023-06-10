const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    budgetAmount: {
        type: Number,
        required: true
    },
    expenses: {
        type: Map,
        of: Number,
        default: {}
      },
    exceeded: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Budget", budgetSchema);
