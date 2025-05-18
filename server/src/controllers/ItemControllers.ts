import { Request, Response } from "express";
import { db } from "../db/db";
import { getSocketIO } from "../utils/socket";

export async function addItem(req: Request, res: Response) {
  const { name, quantity } = req.body;

  // Validasi 'name': wajib, maksimal 100 karakter
  if (typeof name !== 'string' || name.trim() === '' || name.length > 100) {
    res.status(400).json({ message: "Field 'name' is required and must be a string up to 100 characters." });
    return;
  }

  // Validasi 'quantity': wajib, angka positif
  const parsedQuantity = Number(quantity);
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    res.status(400).json({ message: "Field 'quantity' is required and must be a positive number." });
    return;
  }

  try {
    const newItem = await db.item.create({
      data: {
        name: name.trim().toLowerCase(),
        quantity: parsedQuantity,
        // date tidak perlu diisi karena sudah default(now()) di Prisma schema
      },
    });

    // Format date untuk response
    const formattedDate = newItem.dateTime.toISOString().split("T")[0];

    // Emit the new product event through socket.io
    const io = getSocketIO();
    if (io) {
      io.emit("new-product", {
        name: newItem.name,
        quantity: newItem.quantity,
        date: formattedDate,
      });
      console.log("Emitted new-product event:", { ...newItem, date: formattedDate });
    }

    res.status(201).json({
      message: "Item added successfully!",
      data: {
        ...newItem,
        date: formattedDate,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function readItem(req: Request, res: Response) {
  try {
    const items = await db.item.findMany({
      orderBy: {
        dateTime: 'desc', // urutkan berdasarkan kolom 'date' dari yang terbaru
      },
    });

    if (!items || items.length === 0) {
      res.status(404).json({ message: "No items found." });
    }

    const formattedItems = items.map(item => ({
      ...item,
      date: new Date(item.dateTime).toISOString().split('T')[0],
    }));

    res.status(200).json({ data: formattedItems, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
}
