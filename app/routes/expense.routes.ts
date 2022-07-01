import express, { Express } from "express";
import {
  AddExpense,
  DeleteExpense,
  EditExpense,
} from "../controllers/expense.controller";

export = (() => {
  const router = express.Router();
  router.post("/add/:groupId", AddExpense);
  router.delete("/delete/:groupId/:expenseId", DeleteExpense);
  router.put("/edit/:groupId/:expenseId", EditExpense);
  return router;
})();
