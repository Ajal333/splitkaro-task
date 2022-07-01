"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalances = void 0;
let indulgedUsers = [];
let positives = {};
let negatives = {};
const getBalances = (items, currentBalances) => {
    let balances = currentBalances;
    items === null || items === void 0 ? void 0 : items.forEach((item, key) => {
        const paidUsers = Object.keys(item === null || item === void 0 ? void 0 : item.paidBy[0]);
        const owedUsers = Object.keys(item === null || item === void 0 ? void 0 : item.owedBy[0]);
        indulgedUsers = [
            ...new Set([...indulgedUsers, ...paidUsers, ...owedUsers]),
        ];
        indulgedUsers === null || indulgedUsers === void 0 ? void 0 : indulgedUsers.forEach((user) => {
            var _a, _b, _c, _d;
            let totalBalance = ((_b = (_a = balances[user]) === null || _a === void 0 ? void 0 : _a.totalBalance) !== null && _b !== void 0 ? _b : 0) +
                ((_c = item === null || item === void 0 ? void 0 : item.paidBy[0][user]) !== null && _c !== void 0 ? _c : 0) -
                ((_d = item === null || item === void 0 ? void 0 : item.owedBy[0][user]) !== null && _d !== void 0 ? _d : 0);
            if (key === items.length - 1) {
                if (totalBalance > 0) {
                    positives[user] = totalBalance;
                }
                else {
                    negatives[user] = totalBalance;
                }
            }
            balances[user] = {
                totalBalance: totalBalance,
                owesTo: {},
                owedBy: {},
            };
        });
    });
    balanceDebts(positives, negatives, balances);
    return balances;
};
exports.getBalances = getBalances;
const balanceDebts = (p, n, balances) => {
    let newP = JSON.parse(JSON.stringify(p));
    let newN = JSON.parse(JSON.stringify(n));
    Object.keys(newN).forEach((neg) => {
        let negative = neg;
        Object.entries(newP).forEach((pos, key) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
            if (newN[negative] === 0) {
                delete newN[negative];
                return;
            }
            if (pos[1] === -newN[negative]) {
                balances[negative] = Object.assign(Object.assign({}, balances[negative]), { owesTo: Object.assign(Object.assign({}, ((_b = (_a = balances[negative]) === null || _a === void 0 ? void 0 : _a["owesTo"]) !== null && _b !== void 0 ? _b : {})), { [pos[0]]: ((_d = (_c = balances[negative]) === null || _c === void 0 ? void 0 : _c["owesTo"]) === null || _d === void 0 ? void 0 : _d[pos[0]])
                            ? ((_f = (_e = balances[negative]) === null || _e === void 0 ? void 0 : _e["owesTo"]) === null || _f === void 0 ? void 0 : _f[pos[0]]) + newP[pos[0]]
                            : newP[pos[0]] }) });
                balances[pos[0]] = Object.assign(Object.assign({}, balances[pos[0]]), { owedBy: Object.assign(Object.assign({}, ((_h = (_g = balances[pos[0]]) === null || _g === void 0 ? void 0 : _g["owedBy"]) !== null && _h !== void 0 ? _h : {})), { [negative]: ((_k = (_j = balances[pos[0]]) === null || _j === void 0 ? void 0 : _j["owedBy"]) === null || _k === void 0 ? void 0 : _k[negative])
                            ? ((_m = (_l = balances[pos[0]]) === null || _l === void 0 ? void 0 : _l["owedBy"]) === null || _m === void 0 ? void 0 : _m[negative]) + newP[pos[0]]
                            : newP[pos[0]] }) });
                delete newN[negative];
                return;
            }
            else if (pos[1] > -newN[negative]) {
                newP[pos[0]] = pos[1] + newN[negative];
                balances[negative] = Object.assign(Object.assign({}, balances[negative]), { owesTo: Object.assign(Object.assign({}, ((_p = (_o = balances[negative]) === null || _o === void 0 ? void 0 : _o["owesTo"]) !== null && _p !== void 0 ? _p : {})), { [pos[0]]: ((_r = (_q = balances[negative]) === null || _q === void 0 ? void 0 : _q["owesTo"]) === null || _r === void 0 ? void 0 : _r[pos[0]])
                            ? ((_t = (_s = balances[negative]) === null || _s === void 0 ? void 0 : _s["owesTo"]) === null || _t === void 0 ? void 0 : _t[pos[0]]) + -newN[negative]
                            : -newN[negative] }) });
                balances[pos[0]] = Object.assign(Object.assign({}, balances[pos[0]]), { owedBy: Object.assign(Object.assign({}, ((_v = (_u = balances[pos[0]]) === null || _u === void 0 ? void 0 : _u["owedBy"]) !== null && _v !== void 0 ? _v : {})), { [negative]: ((_x = (_w = balances[pos[0]]) === null || _w === void 0 ? void 0 : _w["owedBy"]) === null || _x === void 0 ? void 0 : _x[negative])
                            ? ((_z = (_y = balances[pos[0]]) === null || _y === void 0 ? void 0 : _y["owedBy"]) === null || _z === void 0 ? void 0 : _z[negative]) + -newN[negative]
                            : -newN[negative] }) });
                delete newN[negative];
                return;
            }
            else if (pos[1] < -newN[negative]) {
                newP[pos[0]] = pos[1] + newN[negative];
                newN[negative] = pos[1] + newN[negative];
                balances[negative] = Object.assign(Object.assign({}, balances[negative]), { owesTo: Object.assign(Object.assign({}, ((_1 = (_0 = balances[negative]) === null || _0 === void 0 ? void 0 : _0["owesTo"]) !== null && _1 !== void 0 ? _1 : {})), { [pos[0]]: ((_3 = (_2 = balances[negative]) === null || _2 === void 0 ? void 0 : _2["owesTo"]) === null || _3 === void 0 ? void 0 : _3[pos[0]])
                            ? ((_5 = (_4 = balances[negative]) === null || _4 === void 0 ? void 0 : _4["owesTo"]) === null || _5 === void 0 ? void 0 : _5[pos[0]]) + newP[pos[0]]
                            : newP[pos[0]] }) });
                balances[pos[0]] = Object.assign(Object.assign({}, balances[pos[0]]), { owedBy: Object.assign(Object.assign({}, ((_7 = (_6 = balances[pos[0]]) === null || _6 === void 0 ? void 0 : _6["owedBy"]) !== null && _7 !== void 0 ? _7 : {})), { [negative]: ((_9 = (_8 = balances[pos[0]]) === null || _8 === void 0 ? void 0 : _8["owedBy"]) === null || _9 === void 0 ? void 0 : _9[negative])
                            ? ((_11 = (_10 = balances[pos[0]]) === null || _10 === void 0 ? void 0 : _10["owedBy"]) === null || _11 === void 0 ? void 0 : _11[negative]) + newP[pos[0]]
                            : newP[pos[0]] }) });
            }
        });
    });
    return true;
};
