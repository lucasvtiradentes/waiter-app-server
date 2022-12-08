import multer from 'multer';
import {Router} from 'express';

import {createCategory} from './useCases/categories/createCategory';
import {listCategories} from './useCases/categories/listCategories';
import {listProductsByCategory} from './useCases/categories/listProductsByCategory';
import {cancelOrder} from './useCases/orders/cancelOrder';
import {changeOrderStatus} from './useCases/orders/changeOrderStatus';
import {createOrder} from './useCases/orders/createOrder';
import {listOrders} from './useCases/orders/listOrders';
import {createProduct} from './useCases/products/createProduct';
import {listProducts} from './useCases/products/listProducts';
import {UPLOAD_PATH, API_BASE} from './configs/configs';

export const routes = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, UPLOAD_PATH);
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const avoidComparingError = (route1: string, route2: string) => route1 === route2;
const fixedApiBase = avoidComparingError(API_BASE, '/') ? '' : API_BASE;

routes.get(`${fixedApiBase}/categories`, listCategories);
routes.post(`${fixedApiBase}/categories`, createCategory);
routes.get(`${fixedApiBase}/categories/:categoryId/products`, listProductsByCategory);

routes.get(`${fixedApiBase}/products`, listProducts);
routes.post(`${fixedApiBase}/products`, upload.single('image'), createProduct);

routes.get(`${fixedApiBase}/orders`, listOrders);
routes.post(`${fixedApiBase}/orders`, createOrder);
routes.patch(`${fixedApiBase}/orders/:orderId`, changeOrderStatus);
routes.delete(`${fixedApiBase}/orders/:orderId`, cancelOrder);
