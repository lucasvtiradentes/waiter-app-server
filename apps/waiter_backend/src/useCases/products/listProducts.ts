import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProducts(req: Request, res: Response){
  try {
    const categories = await Product.find();
    res.status(200).json(categories);
  } catch(err: any){
    console.log(err);
    res.status(500).json({error: err.message});
  }
}
