import { Balances, Items } from "../controllers/group.controller";

type CategorizedItems = {
  [key: string]: number;
};

let indulgedUsers: string[] = [];
let positives: CategorizedItems = {};
let negatives: CategorizedItems = {};

export const getBalances = (
  items: Items[],
  currentBalances: Balances
): Balances => {
  let balances = currentBalances;
  items?.forEach((item: Items, key: number) => {
    const paidUsers = Object.keys(item?.paidBy[0]);
    const owedUsers = Object.keys(item?.owedBy[0]);
    indulgedUsers = [
      ...new Set([...indulgedUsers, ...paidUsers, ...owedUsers]),
    ];
    indulgedUsers?.forEach((user) => {
      let totalBalance =
        (balances[user]?.totalBalance ?? 0) +
        (item?.paidBy[0][user] ?? 0) -
        (item?.owedBy[0][user] ?? 0);
      if (key === items.length - 1) {
        if (totalBalance > 0) {
          positives[user] = totalBalance;
        } else {
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

const balanceDebts = (
  p: CategorizedItems,
  n: CategorizedItems,
  balances: Balances
) => {
  let newP: CategorizedItems = JSON.parse(JSON.stringify(p));
  let newN: CategorizedItems = JSON.parse(JSON.stringify(n));
  Object.keys(newN).forEach((neg) => {
    let negative = neg;
    Object.entries(newP).forEach((pos, key) => {
      if (newN[negative] === 0) {
        delete newN[negative];
        return;
      }
      if (pos[1] === -newN[negative]) {
        balances[negative] = {
          ...balances[negative],
          owesTo: {
            ...(balances[negative]?.["owesTo"] ?? {}),
            [pos[0]]: balances[negative]?.["owesTo"]?.[pos[0]]
              ? balances[negative]?.["owesTo"]?.[pos[0]] + newP[pos[0]]
              : newP[pos[0]],
          },
        };
        balances[pos[0]] = {
          ...balances[pos[0]],
          owedBy: {
            ...(balances[pos[0]]?.["owedBy"] ?? {}),
            [negative]: balances[pos[0]]?.["owedBy"]?.[negative]
              ? balances[pos[0]]?.["owedBy"]?.[negative] + newP[pos[0]]
              : newP[pos[0]],
          },
        };
        delete newN[negative];
        return;
      } else if (pos[1] > -newN[negative]) {
        newP[pos[0]] = pos[1] + newN[negative];
        balances[negative] = {
          ...balances[negative],
          owesTo: {
            ...(balances[negative]?.["owesTo"] ?? {}),
            [pos[0]]: balances[negative]?.["owesTo"]?.[pos[0]]
              ? balances[negative]?.["owesTo"]?.[pos[0]] + -newN[negative]
              : -newN[negative],
          },
        };
        balances[pos[0]] = {
          ...balances[pos[0]],
          owedBy: {
            ...(balances[pos[0]]?.["owedBy"] ?? {}),
            [negative]: balances[pos[0]]?.["owedBy"]?.[negative]
              ? balances[pos[0]]?.["owedBy"]?.[negative] + -newN[negative]
              : -newN[negative],
          },
        };

        delete newN[negative];
        return;
      } else if (pos[1] < -newN[negative]) {
        newP[pos[0]] = pos[1] + newN[negative];
        newN[negative] = pos[1] + newN[negative];
        balances[negative] = {
          ...balances[negative],
          owesTo: {
            ...(balances[negative]?.["owesTo"] ?? {}),
            [pos[0]]: balances[negative]?.["owesTo"]?.[pos[0]]
              ? balances[negative]?.["owesTo"]?.[pos[0]] + newP[pos[0]]
              : newP[pos[0]],
          },
        };
        balances[pos[0]] = {
          ...balances[pos[0]],
          owedBy: {
            ...(balances[pos[0]]?.["owedBy"] ?? {}),
            [negative]: balances[pos[0]]?.["owedBy"]?.[negative]
              ? balances[pos[0]]?.["owedBy"]?.[negative] + newP[pos[0]]
              : newP[pos[0]],
          },
        };
      }
    });
  });
  return true;
};
