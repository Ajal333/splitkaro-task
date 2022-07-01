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
exports.GetBalances = exports.AddGroup = exports.group = void 0;
exports.group = [];
const AddGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, members, id } = req === null || req === void 0 ? void 0 : req.body;
        if (!name || !members || !id)
            res.status(400).send({ success: false, message: "Parameter missing." });
        let newGroup = [
            ...exports.group,
            { name, members, id, expenses: [], balances: {} },
        ];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(newGroup));
        res.end();
        exports.group = newGroup;
    }
    catch (error) {
        console.log("error @ AddGroup", error);
        res.status(400).send({ success: false, message: "Could not add group" });
    }
});
exports.AddGroup = AddGroup;
const GetBalances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupId } = req === null || req === void 0 ? void 0 : req.params;
        if (!groupId)
            return res
                .status(400)
                .send({ success: false, message: "Paramete missing!" });
        const requiredGroup = exports.group === null || exports.group === void 0 ? void 0 : exports.group.filter((item) => (item === null || item === void 0 ? void 0 : item.id) === +groupId)[0];
        return res.status(200).send({
            success: true,
            data: { name: requiredGroup === null || requiredGroup === void 0 ? void 0 : requiredGroup.name, balances: requiredGroup === null || requiredGroup === void 0 ? void 0 : requiredGroup.balances },
        });
    }
    catch (error) {
        console.log("error @ GetBalances", error);
        res
            .status(400)
            .send({ success: false, message: "Could not get group balances" });
    }
});
exports.GetBalances = GetBalances;
