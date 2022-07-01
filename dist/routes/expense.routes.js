"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("../controllers/expense.controller");
module.exports = (() => {
    const router = express_1.default.Router();
    router.post("/add/:groupId", expense_controller_1.AddExpense);
    router.delete("/delete/:groupId/:expenseId", expense_controller_1.DeleteExpense);
    router.put("/edit/:groupId/:expenseId", expense_controller_1.EditExpense);
    return router;
})();
