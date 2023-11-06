import { productManager } from "../server.js";
import { Router } from "express";

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }

        return res.json(products);
    } catch (error) {
        console.log(error); // Loguea el error para depuración
        res.status(500).send(`Error al obtener los productos: ${error.message}`);
    }
});


productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductsById(pid);

        if (product) {
            return res.json(product);
        } else {
            return res.status(404).send(`No se encontró un producto con el ID ${pid}`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al obtener el producto con ID ${pid}`);
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        if (!title || !description || !price || !code || !stock || !status || !category) {
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
        const updatedProduct = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category });

        if (updatedProduct) {
            return res.json(updatedProduct);
        } else {
            return res.status(404).send(`No se encontró un producto con el ID ${pid}`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al actualizar el producto con ID ${pid}`);
    }
});


productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedProduct = await productManager.deleteProduct(pid);

        if (deletedProduct) {
            return res.send('Producto eliminado');
        } else {
            return res.status(404).send(`No se encontró un producto con el ID ${pid}`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al eliminar el producto con ID ${pid}`);
    }
});

export { productsRouter as productsRouter };
