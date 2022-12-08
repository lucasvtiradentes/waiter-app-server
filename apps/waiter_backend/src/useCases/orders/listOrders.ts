import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response){
  try {
    const categories = await Order.find()
      .sort({ createdAt: 1 })
      .populate('products.product');
    res.status(200).json(categories);
  } catch(err: any){
    res.status(500).json({error: err.message});
  }
}
