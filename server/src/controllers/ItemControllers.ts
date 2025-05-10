import { Request, Response } from "express";
import { db } from "@/db/db";

export async function addItem(req: Request, res: Response) {
  const { name, quantity, date } = req.body;

  if ( !name || !quantity || !date )  {
    res.status(400).json({ message: "Missing required fields: 'name', 'quantity', 'date'." })
    return;
  }
try {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      res.status(400).json({ error: "Dates must be in YYYY-MM-DD format!", data: null });
      return;
    }

    const parsedDate = new Date(date);

    const newItem = await db.item.create({
      data: {
        name,
        quantity,
        date: parsedDate,
      },
    });


    res.status(201).json({
      message: "Task added successfully and assigned to employees!",
      data: {
        ...newItem,
        date: parsedDate.toISOString().split("T")[0],
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export async function readItem(req: Request, res: Response) {
  try {
    const items = await db.item.findMany();
    res.status(200).json({ data: items, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}