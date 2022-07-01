"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const group_routes_1 = __importDefault(require("./routes/group.routes"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const DATABASE_URL = 'mysql://p7ydyftztjed:pscale_pw_w8bWolaZpSi_zdjdKAo2StW5SmzIpFX5wBEc_dLWT6Q@xz0u2mgf3j2r.us-east-4.psdb.cloud/splikaro?ssl={"rejectUnauthorized":true}';
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
const port = 5000;
app.use("/expense", expense_routes_1.default);
app.use("/group", group_routes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
module.exports = router;
