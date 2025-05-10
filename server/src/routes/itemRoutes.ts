import { addItem, readItem } from "@/controllers/ItemControllers";
import { Router } from "express";

const itemRouter = Router();

itemRouter.get("/task", readItem);
itemRouter.post("/task/add", addItem);

export default itemRouter;