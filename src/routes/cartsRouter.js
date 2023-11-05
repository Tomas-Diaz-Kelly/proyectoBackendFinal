import { Router } from "express";
import { cartManager } from "../routes/cartsRouter";

export const cartsRouter = Router();



cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear el carrito');
  }
});

// Ruta para obtener los productos del carrito con el ID proporcionado
cartsRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener el carrito');
  }
});

// Ruta para agregar un producto al carrito con el ID del producto y del carrito proporcionados
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al agregar el producto al carrito');
  }
});


