import { Request, Response } from 'express';
import { checkMissingParametersRequests } from '../../utils/checkMissingParametersRequests';
import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response){
  try {

    const imagePath = req.file?.filename;
    const {name, description, price, ingredients, category} = req.body;

    const hasMissingParameters = checkMissingParametersRequests(req.body, ['name', 'description', 'price', 'category']);
    if (hasMissingParameters){throw new Error(hasMissingParameters);}

    const productAlreadyExists = await Product.find({ name });
    if (productAlreadyExists.length > 0){throw new Error(`Category ${name} already exists!`);}

    const createdProduct = await Product.create({
      name,
      description,
      category,
      imagePath,
      price: Number(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(createdProduct);

  } catch(err: any){
    console.log(err);
    res.status(500).json({error: err.message});
  }
}
