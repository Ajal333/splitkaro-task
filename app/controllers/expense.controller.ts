import { Request, Response } from "express";
import { getBalances } from "../utils/helper";
import { Expense, Group, group, Items } from "./group.controller";

const findBalance = (items: Items): Items => {
  return items;
};

export const AddExpense = async (req: Request, res: Response) => {
  try {
    const { groupId } = req?.params;
    const { name, items, id } = req?.body;
    if (!name || !items)
      res
        .status(400)
        .send({ success: false, message: "Could not add expense" });
    let newExpense: Expense = { name, items, id };
    let requiredGroup: Group = group?.filter((doc) => doc?.id === +groupId)[0];
    let restGroup: Group[] = group?.filter((doc) => doc?.id !== +groupId);
    let newMembers = requiredGroup["members"];
    items?.forEach((item: Items): void => {
      newMembers = [
        ...newMembers,
        ...Object.keys(item?.owedBy[0]),
        ...Object.keys(item?.paidBy[0]),
      ];
    });
    let newMemberList: string[] = Array.from(new Set(newMembers));
    requiredGroup["expenses"] = [
      ...(requiredGroup?.["expenses"] ?? []),
      newExpense,
    ];
    requiredGroup["members"] = newMemberList;
    let newBalances = getBalances(items, requiredGroup?.balances);
    requiredGroup["balances"] = newBalances;
    restGroup.push(requiredGroup);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(restGroup));
    res.end();
  } catch (error) {
    console.log("error @ AddExpense", error);
    res.status(400).send({ success: false, message: "Could not add expense" });
  }
};

export const DeleteExpense = async (req: Request, res: Response) => {
  try {
    const { groupId, expenseId } = req?.params;
    let filteredGroup: Group = group?.filter((g) => g?.id === +groupId)[0];
    let restGroup: Group[] = group?.filter((g) => g?.id !== +groupId);
    let filteredExpense: Expense[] = filteredGroup?.expenses?.filter(
      (exp) => exp?.id !== +expenseId
    );
    filteredGroup["expenses"] = filteredExpense;
    restGroup.push(filteredGroup);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(restGroup));
    res.end();
  } catch (error) {
    console.log("error @DeleteExpense", error);
    res
      .status(400)
      .send({ sucess: false, message: "Could not delete expense" });
  }
};

export const EditExpense = async (req: Request, res: Response) => {
  try {
    const { name, items, id } = req?.body;
    const { groupId, expenseId } = req?.params;
    if (!name || !items)
      res
        .status(400)
        .send({ success: false, message: "Could not add expense" });
    let newExpense: Expense = { name, items, id };
    let requiredGroup: Group = group?.filter((doc) => doc?.id === +groupId)[0];
    let restGroup: Group[] = group?.filter((doc) => doc?.id !== +groupId);
    let filteredExpenses: Expense[] = requiredGroup?.expenses?.filter(
      (doc: Expense) => doc?.id !== +expenseId
    );
    filteredExpenses = [...filteredExpenses, newExpense];
    requiredGroup["expenses"] = filteredExpenses;
    let newMembers = requiredGroup["members"];
    items?.forEach((item: Items): void => {
      newMembers = [
        ...newMembers,
        ...Object.keys(item?.owedBy[0]),
        ...Object.keys(item?.paidBy[0]),
      ];
    });
    let newMemberList: string[] = Array.from(new Set(newMembers));
    requiredGroup["members"] = newMemberList;
    let newBalances = getBalances(items, requiredGroup?.balances);
    requiredGroup["balances"] = newBalances;
    restGroup.push(requiredGroup);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(restGroup));
    res.end();
  } catch (error) {
    console.log("error @ AddExpense", error);
    res.status(400).send({ success: false, message: "Could not add expense" });
  }
};
