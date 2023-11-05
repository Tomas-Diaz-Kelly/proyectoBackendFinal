import { Router } from "express";
import { productManager} from "../server.js";



const productsRouter = Router()


// En tu archivo productsRouter.js o donde estés configurando las rutas
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }
        
        // Enviar todos los detalles del producto
        return res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los productos');
    }
});



productsRouter.get('/:pid', async (req,res) => {
    const {pid} = req.params;
    try {
        const products =  await ProductManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send(`No recibe producto con id ${pid}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        
        if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category });
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agregar el producto');
    }
});


productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const response = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category });
        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(`Error cuando quiero actualizar el producto ${pid}`);
    }
});


productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send('Producto eliminado')
    } catch (error) {
        console.log(error);
        res.send(`No se elimina el producto ${pid}`)
    }
})


export {productsRouter}