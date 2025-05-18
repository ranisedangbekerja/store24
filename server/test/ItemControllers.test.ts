import { Request, Response } from 'express';
import { addItem, readItem } from '../src/controllers/ItemControllers';
import { db } from '../src/db/db'; // sesuaikan path prisma client kamu

describe('Item Controller', () => {
  let mockResponse: Partial<Response>;
  let jsonMock = jest.fn();
  let statusMock = jest.fn(() => ({ json: jsonMock }));

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    mockResponse = {
      status: statusMock as any,
    };

    // Reset mock function pada setiap beforeEach
    (db.item as any) = {
      create: jest.fn(),
      findMany: jest.fn(),
    };
  });

  describe('addItem Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = {
        body: {},
      };
      res = {
        status: statusMock as any,
      };
    });

    it('should return 400 if name is missing', async () => {
      req.body = { quantity: 5, date: '2023-05-10' };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Field 'name' is required and must be a string up to 100 characters.",
      });
    });

    it('should return 400 if name is longer than 100 characters', async () => {
      req.body = {
        name: 'a'.repeat(101),
        quantity: 5,
        date: '2023-05-10',
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Field 'name' is required and must be a string up to 100 characters.",
      });
    });

    it('should return 400 if quantity is missing', async () => {
      req.body = {
        name: 'Test Item',
        date: '2023-05-10',
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Field 'quantity' is required and must be a positive number.",
      });
    });

    it('should return 400 if quantity is not positive number', async () => {
      req.body = {
        name: 'Test Item',
        quantity: -2,
        date: '2023-05-10',
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Field 'quantity' is required and must be a positive number.",
      });
    });

    it('should return 400 if date is missing', async () => {
      req.body = {
        name: 'Test Item',
        quantity: 1,
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Field 'date' is required and must be in YYYY-MM-DD format!",
      });
    });

    it('should return 400 if date is not in YYYY-MM-DD format', async () => {
      req.body = {
        name: 'Test Item',
        quantity: 1,
        date: '10-05-2023', // salah format
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Field 'date' is required and must be in YYYY-MM-DD format!",
      });
    });

    it('should return 400 if month is not between 1 and 12', async () => {
      req.body = {
        name: 'Test Item',
        quantity: 1,
        date: '2023-13-10',
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Month must be between 1 and 12.',
      });
    });

    it('should return 400 if day is invalid for month/year (e.g., 30 Feb)', async () => {
      req.body = {
        name: 'Test Item',
        quantity: 1,
        date: '2023-02-30',
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Invalid day for the given month and year. 2/2023 has only 28 days.',
      });
    });

    it('should accept 29 Feb in leap year', async () => {
      const mockItem = {
        id: 1,
        name: 'Leap Item',
        quantity: 1,
        date: new Date('2024-02-29'),
      };

      (db.item.create as jest.Mock).mockResolvedValue(mockItem);

      req.body = {
        name: 'Leap Item',
        quantity: 1,
        date: '2024-02-29',
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Item added successfully!',
        data: {
          ...mockItem,
          date: '2024-02-29',
        },
        error: null,
      });
    });

    it('should return 500 if Prisma throws an error', async () => {
      (db.item.create as jest.Mock).mockRejectedValue(new Error('DB Error'));

      req.body = {
        name: 'Error Item',
        quantity: 1,
        date: '2023-05-10',
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Internal server error.',
      });
    });
  });

  describe('readItem controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = {};
      res = {
        status: statusMock as any,
      };
    });

    it('should return 200 with formatted items if items exist', async () => {
      const mockItems = [
        {
          id: 1,
          name: 'Item A',
          quantity: 5,
          date: new Date('2024-05-17T00:00:00.000Z'),
        },
      ];

      (db.item.findMany as jest.Mock).mockResolvedValue(mockItems);

      await readItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        data: [
          {
            id: 1,
            name: 'Item A',
            quantity: 5,
            date: '2024-05-17',
          },
        ],
        error: null,
      });
    });

    it('should return 404 if no items found', async () => {
      (db.item.findMany as jest.Mock).mockResolvedValue([]);

      await readItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'No items found.',
      });
    });

    it('should return 500 if database throws error', async () => {
      (db.item.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));

      await readItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Internal server error.',
      });
    });
  });
});
