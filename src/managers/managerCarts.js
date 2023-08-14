const { log } = require('console');
const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file
    }


    async save(objeto) {
        try {
            const objects = await this.getAllObjects()
            const timestamp = Date.now();
            const nombre = "Cartnum";
            objeto.id = timestamp + nombre.replace(/\s+/g, '');
            objects.push(objeto)
            await this.saveObjects(objects)
        }
        catch (error) {
            console.log(error);
            throw new Error('Error al guardar el objeto')

        }
    }

    async getById(id) {
        try {

            const objects = await this.getAllObjects()
            const searchObj = objects.find((o) => o.id === id)
            return searchObj || null
        }
        catch (error) {
            throw new Error('Error al buscar objeto por id')
        }
    }

    async updateById(objeto, id) {
        try {
            const objects = await this.getAllObjects();
            const productIndex = objects.findIndex((producto) => producto.id === id);

            if (productIndex === -1) {
                return null;
            }

            objects[productIndex] = {
                ...objects[productIndex],
                ...objeto
            };

            await this.saveObjects(objects);
            return objects[productIndex];

        }
        catch (error) {
            throw new Error('Error al actualizar objeto por id')
        }
    }


    async updateByDobleId(objeto, cid, pid) {
        try {
            const carts = await this.getAllObjects();

            const cartIndex = carts.find((cart) => cart.id === cid);

            if (cartIndex === -1) {
                throw new Error('No se encontro el carrito');
            }

            const productIndex = objects.find((producto) => producto.id === pid);

            if (productIndex === -1) {
                return null;
            }

            // Busco el índice del producto en el arreglo de productos del carrito
            const cart = carts[cartIndex];
            const cartProducts = cart.products;
            const existingProductIndex = cartProducts.find((prod) => prod.id === pid);

            // Si ya existe incremento la cantidad del producto en el carrito
            if (existingProductIndex !== -1) {
                cartProducts[existingProductIndex].quantity += 1;
                console.log(cartProducts[existingProductIndex].quantity);
                return res.json({ message: 'Cantidad del producto incrementada en el carrito.' });
            }

            //Si el producto no existe lo agrego con la cantidad 1
            objeto.quantity = 1;
            cartProducts.push(objeto);


            await this.saveObjects(carts);
            return carts[cartIndex];

        }
        catch (error) {
            throw new Error('Error al actualizar objeto por id')
        }
    }

    async deleteById(id) {
        try {
            let objects = await this.getAllObjects()
            objects = objects.filter((o) => o.id !== id)
            await this.saveObjects(objects)
        }
        catch (error) {
            throw new Error("Error al eliminar los objetos")
        }
    }


    async deleteAll() {
        try {
            await this.saveObjects([])
        }
        catch (error) {
            throw new Error("Error al eliminar todos los objetos")
        }
    }


    async getAllObjects() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            return []
        }
    }

    async saveObjects(objects) {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
        }
        catch (error) {
            throw new Error(" Error al guardar objeto")
        }
    }


}




/*
const main = async () =>{
    

    //Funcion para guardar un objeto
    const id = await productos.save(
        {title: 'Producto', price: 1000}
    )
    console.log('Objeto guardado con ID:', id)

    //Funcion para traer todos los productos
    const allObjects = await productos.getAll()
    console.log('Ubjetos guardados', allObjects)

    //Eliminar un objeto
    await productos.deleteById(1)
    console.log("Objeto eliminado")

    //Obtener objeto por ID
    const obj = await productos.getById(1)
    console.log("Objeto obtenido", obj)
    
}

main().catch((error)=>console.error(error))
const productos = new Contenedor("productos.json")
*/


module.exports = Contenedor;

