import { Router } from 'express';
import InvoiceController from './controllers/InvoiceController';
import ProductController from './controllers/ProductController';

const routes = new Router();
routes.get('/invoices/', InvoiceController.index);
routes.get('/invoice/:id', InvoiceController.show);
routes.post('/invoice/', InvoiceController.create);
routes.delete('/invoice/:id', InvoiceController.destroy);

routes.get('/product/', ProductController.index);
routes.get('/product/:id', ProductController.show);
routes.get('/products/:name', ProductController.filter);

export default routes;
