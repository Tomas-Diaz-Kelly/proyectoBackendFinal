import { v4 as uuidv4 } from 'uuid';

class CartManager {
    constructor() {
        this.carts = {};
    } 

    createCart() {
        const cartId = uuidv4();
        this.carts[cartId] = { id: cartId, products: [] };
        return this.carts[cartId];
    }

    getCartById(cartId) {
        return this.carts[cartId];
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.carts[cartId];
        const existingProduct = cart.products.find(product => product.id === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ id: productId, quantity });
    }

    return cart;
    }
}

export const cartManager = new CartManager();
