"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const group_controller_1 = require("../controllers/group.controller");
module.exports = (() => {
    const router = express_1.default.Router();
    router.post("/create", group_controller_1.AddGroup);
    router.get("/balances/:groupId", group_controller_1.GetBalances);
    return router;
})();
