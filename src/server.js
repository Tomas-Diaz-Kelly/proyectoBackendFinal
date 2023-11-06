import express from "express";
import { productsRouter } from "./routes/productsRouter.js";
import { ProductManager } from './ProductManager.js';
import { cartsRouter } from "./routes/cartsRouter.js";

export const productManager = new ProductManager();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

app.use((err, req, res, next) => {
  res.json({
    status: 'error',
    descr:err.message
  })
})

app.listen(PORT, () => {
  console.log(`Conectado al puerto: ${PORT}`);
});
