import { Request, Response } from "express";
import { db } from "../db/db";
import { getSocketIO } from "../routes/itemRoutes";

export async function addItem(req: Request, res: Response) {
  const { name, quantity, date } = req.body;

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

  // Validasi format tanggal
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date) || !date) {
    res.status(400).json({ message: "Field 'date' is required and must be in YYYY-MM-DD format!"});
    return;
  }

  const [yearStr, monthStr, dayStr] = date.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (month < 1 || month > 12) {
    res.status(400).json({ message: "Month must be between 1 and 12." });
    return;
  }

  // Cek validitas hari sesuai bulan dan tahun
  const maxDaysInMonth = new Date(year, month, 0).getDate(); // tanggal 0 bulan berikutnya = hari terakhir bulan saat ini
  if (day < 1 || day > maxDaysInMonth) {
    res.status(400).json({ message: `Invalid day for the given month and year. ${month}/${year} has only ${maxDaysInMonth} days.` });
    return;
  }

  try {
    const parsedDate = new Date(date);

    const newItem = await db.item.create({
      data: {
        name: name.trim(),
        quantity: parsedQuantity,
        date: parsedDate,
      },
    });

     // Format the response data
    const formattedItem = {
      ...newItem,
      date: parsedDate.toISOString().split("T")[0],
    };

    // Emit the new product event through socket.io
    const io = getSocketIO();
    if (io) {
      io.emit("new-product", {
        name: formattedItem.name,
        quantity: formattedItem.quantity,
        date: formattedItem.date
      });
      console.log("Emitted new-product event:", formattedItem);
    }

    res.status(201).json({
      message: "Item added successfully!",
      data: {
        ...newItem,
        date: parsedDate.toISOString().split("T")[0],
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
    const items = await db.item.findMany();

    if (!items || items.length === 0) {
      res.status(404).json({ message: "No items found." });
    }

    const formattedItems = items.map(item => ({
      ...item,
      date: new Date(item.date).toISOString().split('T')[0],
    }));

    res.status(200).json({ data: formattedItems, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
}
