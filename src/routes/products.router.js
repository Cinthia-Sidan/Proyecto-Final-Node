
const express = require('express');
const router = express.Router();

const fs = require('fs');

const Contenedor = require('../managers/managerProducts');

const productos = new Contenedor("productos.json");



//Ruta para obtener todos los productos
router.get('/api/productos', async (req, res) => {
    const allProducts = await productos.getAllObjects();
    res.json({ allProducts });
});

// Ruta para obtener un producto específico
router.get('/api/productos/:pid',async (req, res) => {
    const pid = req.params.pid;
    console.log(pid)

    // Ejemplo de búsqueda en un array de productos (reemplaza esta lógica con tu base de datos)
    const product =await productos.getById(pid);

    if (product == null) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(product);
});


// Ruta para agregar un nuevo producto
router.post('/api/productos',async (req, res) => {

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

    
    
    console.log(await productos.save(newProduct));



    res.json({ message: 'Producto agregado correctamente.' });

});


// Ruta para actualizar un producto por su ID (PUT /:pid)
router.put('/api/productos/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updateFields = req.body;

    try{
        // Validamos que se proporcionen campos para actualizar
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }

    const update = await productos.updateById(updateFields, pid);

    if(update == null){
        return res.json({ error: 'Producto no existente'})
    }
    

    return res.json(update);
    }
    catch(error){
        res.status(500).json({ error: 'No se pudo actualizar el producto' });
    }

    
});

// Ruta para eliminar un producto por su ID (DELETE /:pid)
router.delete('/api/productos/:pid',async (req, res) => {
    const pid = req.params.pid;


    const productIndex =await productos.deleteById(pid);

    res.json({ message: 'Producto eliminado correctamente.' });
});


module.exports = router;