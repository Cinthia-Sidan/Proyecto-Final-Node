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

//Ruta para agregar producto al arreglo productos del carrito

router.post('/api/carts/:cid/product/:pid', (req,res)=>{
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const cartIndex = carts.find((cart) => cart.id === cid);

    if (cartIndex === -1){
        return res.status(404).json({error: 'No se encontro el carrito'});
    }

    const productIndex = products.find((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    // Busco el índice del producto en el arreglo de productos del carrito
    const cartProducts = carts[cartIndex].products;
    const existingProductIndex = cartProducts.findIndex((prod) => prod.id === pid);

    // Si ya existe incremento la cantidad del producto en el carrito
    if (existingProductIndex !== -1) {
        cartProducts[existingProductIndex].quantity += 1;
        return res.json({ message: 'Cantidad del producto incrementada en el carrito.' });
    }

    //Si el producto no existe lo agrego con la cantidad 1
    product.quantity = 1;
    cartProducts.push(product);

    res.json({ message: 'Producto agregado al carrito correctamente.' });




})



module.exports = router;