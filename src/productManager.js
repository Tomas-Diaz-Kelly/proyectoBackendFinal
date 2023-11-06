import { promises as fs } from "fs";
import {v4 as uuidv4} from 'uuid'


export class ProductManager {
    constructor(){
        this.path = 'products.json'
        this.products = []
    }
    addProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
      const id = uuidv4();
      const newProduct = { id, title, description, price, thumbnail, code, stock, status, category };
      
      try {
        this.products = await this.getProducts();
          this.products.push(newProduct);
          await fs.writeFile(this.path, JSON.stringify(this.products, null));
          return newProduct;
      } catch (error) {
          console.error('Error al agregar el producto:', error);
          return null;
      }
  }
  

   getProducts = async () => {
    try {
        const response = await fs.readFile(this.path, 'utf8');
        const products = JSON.parse(response);
        return products;
    } catch (error) {
        console.log('Error al obtener los productos:', error);
        return null;
    }
}

    
    
    getProductsById = async (id) => {
      const response = await this.getProducts();
      const product = response.find(p => p.id === id);
  
      if (product) {
          return product;
      } else {
          console.log('Producto no encontrado');
          return null; 
      }
  }
  

  updateProduct = async (id, data) => {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      await fs.writeFile(this.path, JSON.stringify(products));
      return products[index];
    } else {
      console.log('Producto no encontrado');
      return null; 
    }
  }
  
    
      

  deleteProduct = async (id) => {
    try {
        const products = await this.getProducts();
        const indice = products.findIndex(p => p.id === id);

        if (indice !== -1) {
            products.splice(indice, 1);
            await fs.writeFile(this.path, JSON.stringify(products));
            console.log('Producto eliminado correctamente');
            return true;
        } else {
            console.log('Producto no encontrado');
            return false;
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return null; 
    }
}

      
      
}

