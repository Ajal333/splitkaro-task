"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditExpense = exports.DeleteExpense = exports.AddExpense = void 0;
const helper_1 = require("../utils/helper");
const group_controller_1 = require("./group.controller");
const findBalance = (items) => {
    return items;
};
const AddExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { groupId } = req === null || req === void 0 ? void 0 : req.params;
        const { name, items, id } = req === null || req === void 0 ? void 0 : req.body;
        if (!name || !items)
            res
                .status(400)
                .send({ success: false, message: "Could not add expense" });
        let newExpense = { name, items, id };
        let requiredGroup = group_controller_1.group === null || group_controller_1.group === void 0 ? void 0 : group_controller_1.group.filter((doc) => (doc === null || doc === void 0 ? void 0 : doc.id) === +groupId)[0];
        let restGroup = group_controller_1.group === null || group_controller_1.group === void 0 ? void 0 : group_controller_1.group.filter((doc) => (doc === null || doc === void 0 ? void 0 : doc.id) !== +groupId);
        let newMembers = requiredGroup["members"];
        items === null || items === void 0 ? void 0 : items.forEach((item) => {
            newMembers = [
                ...newMembers,
                ...Object.keys(item === null || item === void 0 ? void 0 : item.owedBy[0]),
                ...Object.keys(item === null || item === void 0 ? void 0 : item.paidBy[0]),
            ];
        });
        let newMemberList = Array.from(new Set(newMembers));
        requiredGroup["expenses"] = [
            ...((_a = requiredGroup === null || requiredGroup === void 0 ? void 0 : requiredGroup["expenses"]) !== null && _a !== void 0 ? _a : []),
            newExpense,
        ];
        requiredGroup["members"] = newMemberList;
        let newBalances = (0, helper_1.getBalances)(items, requiredGroup === null || requiredGroup === void 0 ? void 0 : requiredGroup.balances);
        requiredGroup["balances"] = newBalances;
        restGroup.push(requiredGroup);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(restGroup));
        res.end();
    }
    catch (error) {
        console.log("error @ AddExpense", error);
        res.status(400).send({ success: false, message: "Could not add expense" });
    }
});
exports.AddExpense = AddExpense;
const DeleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { groupId, expenseId } = req === null || req === void 0 ? void 0 : req.params;
        let filteredGroup = group_controller_1.group === null || group_controller_1.group === void 0 ? void 0 : group_controller_1.group.filter((g) => (g === null || g === void 0 ? void 0 : g.id) === +groupId)[0];
        let restGroup = group_controller_1.group === null || group_controller_1.group === void 0 ? void 0 : group_controller_1.group.filter((g) => (g === null || g === void 0 ? void 0 : g.id) !== +groupId);
        let filteredExpense = (_b = filteredGroup === null || filteredGroup === void 0 ? void 0 : filteredGroup.expenses) === null || _b === void 0 ? void 0 : _b.filter((exp) => (exp === null || exp === void 0 ? void 0 : exp.id) !== +expenseId);
        filteredGroup["expenses"] = filteredExpense;
        restGroup.push(filteredGroup);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(restGroup));
        res.end();
    }
    catch (error) {
        console.log("error @DeleteExpense", error);
        res
            .status(400)
            .send({ sucess: false, message: "Could not delete expense" });
    }
});
exports.DeleteExpense = DeleteExpense;
const EditExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { name, items, id } = req === null || req === void 0 ? void 0 : req.body;
        const { groupId, expenseId } = req === null || req === void 0 ? void 0 : req.params;
        if (!name || !items)
            res
                .status(400)
                .send({ success: false, message: "Could not add expense" });
        let newExpense = { name, items, id };
        let requiredGroup = group_controller_1.group === null || group_controller_1.group === void 0 ? void 0 : group_controller_1.group.filter((doc) => (doc === null || doc === void 0 ? void 0 : doc.id) === +groupId)[0];
        let restGroup = group_controller_1.group === null || group_controller_1.group === void 0 ? void 0 : group_controller_1.group.filter((doc) => (doc === null || doc === void 0 ? void 0 : doc.id) !== +groupId);
        let filteredExpenses = (_c = requiredGroup === null || requiredGroup === void 0 ? void 0 : requiredGroup.expenses) === null || _c === void 0 ? void 0 : _c.filter((doc) => (doc === null || doc === void 0 ? void 0 : doc.id) !== +expenseId);
        filteredExpenses = [...filteredExpenses, newExpense];
        requiredGroup["expenses"] = filteredExpenses;
        let newMembers = requiredGroup["members"];
        items === null || items === void 0 ? void 0 : items.forEach((item) => {
            newMembers = [
                ...newMembers,
                ...Object.keys(item === null || item === void 0 ? void 0 : item.owedBy[0]),
                ...Object.keys(item === null || item === void 0 ? void 0 : item.paidBy[0]),
            ];
        });
        let newMemberList = Array.from(new Set(newMembers));
        requiredGroup["members"] = newMemberList;
        let newBalances = (0, helper_1.getBalances)(items, requiredGroup === null || requiredGroup === void 0 ? void 0 : requiredGroup.balances);
        requiredGroup["balances"] = newBalances;
        restGroup.push(requiredGroup);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(restGroup));
        res.end();
    }
    catch (error) {
        console.log("error @ AddExpense", error);
        res.status(400).send({ success: false, message: "Could not add expense" });
    }
});
exports.EditExpense = EditExpense;
