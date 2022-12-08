import { Request, Response } from 'express';
import { checkMissingParametersRequests } from '../../utils/checkMissingParametersRequests';
import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response){
  try {
    const { icon, name } = req.body;

    const hasMissingParameters = checkMissingParametersRequests(req.body, ['name', 'icon']);
    if (hasMissingParameters){throw new Error(hasMissingParameters);}

    const categoryAlreadyExists = await Category.find({ name });
    if (categoryAlreadyExists.length > 0){throw new Error(`Category ${name} already exists!`);}

    const createdCategory = await Category.create({icon, name});
    res.status(201).json(createdCategory);
  } catch(err: any){
    res.status(500).json({error: err.message});
  }
}
