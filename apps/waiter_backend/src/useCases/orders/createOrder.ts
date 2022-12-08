import { Request, Response } from 'express';
import { checkMissingParametersRequests } from '../../utils/checkMissingParametersRequests';
import { Order } from '../../models/Order';
import { io } from '../../index';

export async function createOrder(req: Request, res: Response){
  try {
    const { table, products } = req.body;

    const hasMissingParameters = checkMissingParametersRequests(req.body, ['table', 'products']);
    if (hasMissingParameters){throw new Error(hasMissingParameters);}

    const createdOrder = await Order.create({table, products});

    const completeorder = await createdOrder.populate('products.product');
    io.emit('orders@new', completeorder);

    res.status(201).json(createdOrder);
  } catch(err: any){
    res.status(500).json({error: err.message});
  }
}
