const express = require('express');
const router = express.Router();

//Array de carritos

const carts =[];

//Ruta para obtener todos carritos
router.get('/api/carritos', (req, res) => {
    res.json({ carts });
});

// Ruta para crear un nuevo carrito
router.post('/api/carritos', (req, res) => {
    const { id, products } = req.body;

    // Validar que se proporcionen los campos necesarios
    if (!id || !products) {
        return res.status(400).json({ error: 'Debe proporcionar un ID y un array de productos.' });
    }

    // Crear el nuevo carrito
    const newCart = {
        id,
        products
    };

    carts.push(newCart);

    res.json({ message: 'Carrito creado correctamente.' });
});




module.exports = router;