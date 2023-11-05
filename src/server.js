import express from "express";
import { productsRouter } from "./routes/productsRouter.js";
import { ProductManager } from './ProductManager.js';
import { cartsRouter } from "./routes/cartsRouter.js";

export const productManager = new ProductManager();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(cartsRouter);

app.listen(PORT, () => {
  console.log(`Conectado al puerto: ${PORT}`);
});
