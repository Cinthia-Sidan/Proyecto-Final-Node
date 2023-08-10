
const express = require('express');
const router = express.Router();

const fs = require('fs').promises;

function cargarProductosDesdeArchivo() {
  try {
    const data = fs.readFileSync('productos.json', 'utf-8');
    products = JSON.parse(data);
  } catch (error) {
    // El archivo no existe o no se pudo leer
    console.log('No se pudo cargar el archivo productos.json');
  }
}


function guardarProductosEnArchivo(products) {
    fs.writeFile('productos.json', JSON.stringify(products, null, 2), 'utf-8');
  }

//Array de productos

const products = [];

cargarProductosDesdeArchivo();

//Ruta para obtener todos los productos
router.get('/api/productos', (req, res) => {
    res.json({ products });
    prod.readProductsFile();
});

// Ruta para obtener un producto específico
router.get('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    console.log(pid)

    // Ejemplo de búsqueda en un array de productos (reemplaza esta lógica con tu base de datos)
    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(product);
});


// Ruta para agregar un nuevo producto
router.post('/api/productos', (req, res) => {

    const newProduct = req.body;

    // Validamos que se proporcionen todos los campos
    if (!newProduct.name ||
        !newProduct.price ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.category) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos (id, name, price, description, code, stock, category).' });
    }

    const timestamp = Date.now();
    const nombre = newProduct.name;
    newProduct.id = timestamp + nombre.replace(/\s+/g, '');

    products.push(newProduct);
    guardarProductosEnArchivo(products);

    console.log(products);


    res.json({ message: 'Producto agregado correctamente.' });

});


// Ruta para actualizar un producto por su ID (PUT /:pid)
router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;

    // Validamos que se proporcionen campos para actualizar
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }

    const productIndex = products.find((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    };

    return res.json(products[productIndex]);
});

// Ruta para eliminar un producto por su ID (DELETE /:pid)
router.delete('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);


    const productIndex = products.find((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const deletedProduct = products.splice(productIndex, 1);

    return res.json(deletedProduct[0]);
});


module.exports = router;