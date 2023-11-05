import  express  from "express";
import { productsRouter } from "./routes/productsRouter.js";
import { ProductManager } from './ProductManager.js';


export const productManager = new ProductManager();

const PORT = 8080;

const app = express()


app.use(express.json())
app.use('/api/products', productsRouter)


app.listen(PORT, (req,res) => {
    console.log(`Conectado al puerto: ${PORT}`);
})