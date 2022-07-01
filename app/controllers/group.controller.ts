import { Request, Response } from "express";

export interface Items {
  name: string;
  paidBy: any[];
  owedBy: any[];
}
export interface Expense {
  id: number;
  name: string;
  items: Items[];
}

export interface Balances {
  [key: string]: {
    totalBalance: number;
    owesTo: any;
    owedBy: any;
  };
}

export interface Group {
  id: number;
  name: string;
  members: string[];
  expenses: Expense[];
  balances: Balances;
}

export let group: Group[] = [];
export const AddGroup = async (req: Request, res: Response) => {
  try {
    const { name, members, id } = req?.body;
    if (!name || !members || !id)
      res.status(400).send({ success: false, message: "Parameter missing." });

    let newGroup: Group[] = [
      ...group,
      { name, members, id, expenses: [], balances: {} },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(newGroup));
    res.end();
    group = newGroup;
  } catch (error) {
    console.log("error @ AddGroup", error);
    res.status(400).send({ success: false, message: "Could not add group" });
  }
};

export const GetBalances = async (req: Request, res: Response) => {
  try {
    const { groupId } = req?.params;
    if (!groupId)
      return res
        .status(400)
        .send({ success: false, message: "Paramete missing!" });
    const requiredGroup: Group = group?.filter(
      (item) => item?.id === +groupId
    )[0];
    return res.status(200).send({
      success: true,
      data: { name: requiredGroup?.name, balances: requiredGroup?.balances },
    });
  } catch (error) {
    console.log("error @ GetBalances", error);
    res
      .status(400)
      .send({ success: false, message: "Could not get group balances" });
  }
};
