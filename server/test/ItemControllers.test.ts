import { Request, Response } from 'express';
import { addItem, readItem } from '../src/controllers/itemControllers';
import { db } from '../src/db/db'; // sesuaikan path prisma client kamu
import { getSocketIO } from '../src/utils/socket';

jest.mock('../src/utils/socket', () => ({
  getSocketIO: jest.fn(),
}));

describe('Item Controller', () => {
  let mockResponse: Partial<Response>;
  let jsonMock = jest.fn();
  let statusMock = jest.fn(() => ({ json: jsonMock }));
  const mockEmit = jest.fn();

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    mockResponse = {
      status: statusMock as any,
    };

    (db.item as any) = {
      create: jest.fn(),
      findMany: jest.fn(),
    };

    // Setup mock for getSocketIO to return mock socket with emit spy
    (getSocketIO as jest.Mock).mockReturnValue({
      emit: mockEmit,
    });

    mockEmit.mockClear();
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
      req.body = { quantity: 5 };
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

    it('should store name in lowercase and emit socket.io event', async () => {
      const mockItem = {
        id: 1,
        name: 'leap item',
        quantity: 1,
        dateTime: new Date('2024-05-01T00:00:00.000Z'),
      };

      (db.item.create as jest.Mock).mockResolvedValue(mockItem);

      req.body = {
        name: 'Leap ITEM',
        quantity: 1,
      };

      await addItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Item added successfully!',
        data: {
          ...mockItem,
          date: '2024-05-01',
        },
        error: null,
      });

      expect(mockEmit).toHaveBeenCalledWith('new-product', expect.objectContaining({
        name: 'leap item',
        quantity: 1,
        date: '2024-05-01',
      }));
      
      expect(db.item.create).toHaveBeenCalledWith({
        data: {
          name: 'leap item',
          quantity: 1,
        },
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
          name: 'item a',
          quantity: 5,
          dateTime: new Date('2024-05-17T00:00:00.000Z'),
        },
      ];

      (db.item.findMany as jest.Mock).mockResolvedValue(mockItems);

      await readItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        data: [
          {
            id: 1,
            name: 'item a',
            quantity: 5,
            dateTime: new Date('2024-05-17T00:00:00.000Z'),
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

    it('should return 500 if Prisma throws error', async () => {
      (db.item.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));

      await readItem(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Internal server error.',
      });
    });
  });
});
