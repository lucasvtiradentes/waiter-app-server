import { Request, Response } from 'express';
import { checkMissingParametersRequests } from '../../utils/checkMissingParametersRequests';
import { Order } from '../../models/Order';

export async function cancelOrder(req: Request, res: Response){
  try {

    const { orderId } = req.params;

    const hasMissingParameters = checkMissingParametersRequests(req.params, ['orderId']);
    if (hasMissingParameters){throw new Error(hasMissingParameters);}

    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ deletedOrder: orderId});

  } catch(err: any){
    res.status(500).json({error: err.message});
  }
}
