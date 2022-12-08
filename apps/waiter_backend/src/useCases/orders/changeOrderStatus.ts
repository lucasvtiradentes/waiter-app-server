import { Request, Response } from 'express';
import { checkMissingParametersRequests } from '../../utils/checkMissingParametersRequests';
import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response){
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const hasMissingParameters = checkMissingParametersRequests(req.params, ['orderId']);
    if (hasMissingParameters){throw new Error(hasMissingParameters);}

    const hasMissingParametersBody = checkMissingParametersRequests(req.body, ['status']);
    if (hasMissingParametersBody){throw new Error(hasMissingParametersBody);}

    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ updatedOrder: orderId, newStatus: status});

  } catch(err: any){
    res.status(500).json({error: err.message});
  }
}
