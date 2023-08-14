const express = require('express');
const router = express.Router();

const fs = require('fs');

const Contenedor = require('../managers/managerCarts');

const carritos = new Contenedor("carritos.json");


//Ruta para obtener todos carritos
router.get('/api/carritos',async (req, res) => {
    const allCarts = await carritos.getAllObjects();
    res.json({ allCarts });
});

// Ruta para crear un nuevo carrito
router.post('/api/carritos',async (req, res) => {
    const newCart = req.body;

    // Validar que se proporcionen los campos necesarios
    if (!newCart.products) {
        return res.status(400).json({ error: 'Debe proporcionar un array de productos.' });
    }

    const postCart =await carritos.save(newCart);

    res.json({ message: 'Carrito creado correctamente.' });
});

//Ruta para agregar producto al arreglo productos del carrito

router.post('/api/carts/:cid/product/:pid',async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const newProduct = req.body;

    const postProductToCart=await carritos.updateByDobleId(newProduct, cid, pid);

    res.json({ message: 'Producto agregado al carrito correctamente.' });




})



module.exports = router;