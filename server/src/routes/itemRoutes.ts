import { addItem, readItem } from "../controllers/itemControllers";
import { Router } from "express";

const itemRouter = Router();

itemRouter.get("/item", readItem);
itemRouter.post("/item/add", addItem);

export default itemRouter;