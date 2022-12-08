import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function listCategories(req: Request, res: Response){
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch(err: any){
    res.status(500).json({error: err.message});
  }
}
