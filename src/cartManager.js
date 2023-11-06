import { promises as fs } from "fs";
import { v4 as uuidv4 } from 'uuid';

class CartManager {
    constructor() {
        this.path = 'cart.json'; 
        this.carts = {};
    } 

    async createCart() {
        const cartId = uuidv4();
        this.carts[cartId] = { id: cartId, products: [] };

        try {
            await this.writeCartsToFile();
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
        return this.carts[cartId];
    }

    async loadCart(){
        try {
            await fs.access(this.path, fs.constants.F_OK);
            const cart = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(cart);
        } catch (error) {
            this.carts = {};
        }
    }

    async getCartById(cartId) {
        await this.loadCart();
        return this.carts[cartId];
    }

    async addProductToCart(cartId, productId, quantity) {
        await this.loadCart();
        const cart = this.carts[cartId];
    
        if (cart) {
            const existingProduct = cart.products.find(product => product.id === productId);
    
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ id: productId, quantity });
            }
    
            try {
                await this.writeCartsToFile();
            } catch (error) {
                console.error('Error al escribir en el archivo:', error);
            }
            return cart;
        } else {
            return null;
        }
    }

    async writeCartsToFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log('Carts escritos en el archivo correctamente.');
        } catch (error) {
            throw new Error('Error al escribir en el archivo: ' + error.message);
        }
    }
}

export const cartManager = new CartManager();
