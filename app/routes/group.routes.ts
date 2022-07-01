import express, { Express } from "express";
import { AddGroup, GetBalances } from "../controllers/group.controller";

export = (() => {
  const router = express.Router();
  router.post("/create", AddGroup);
  router.get("/balances/:groupId", GetBalances);
  return router;
})();
