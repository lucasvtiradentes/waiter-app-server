import { Request, Response } from 'express';
import { checkMissingParametersRequests } from '../../utils/checkMissingParametersRequests';
import { Product } from '../../models/Product';

export async function listProductsByCategory(req: Request, res: Response){
  try {
    const { categoryId } = req.params;

    const hasMissingParameters = checkMissingParametersRequests(req.params, ['categoryId']);
    if (hasMissingParameters){throw new Error(hasMissingParameters);}

    const categories = await Product.find().where('category').equals(categoryId);
    res.status(200).json(categories);
  } catch(err: any){
    res.status(500).json({error: err.message});
  }
}
