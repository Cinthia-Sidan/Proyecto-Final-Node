const express = require('express');
const router = express.Router();

//Array de carritos

const carts =[];

//Ruta para obtener todos carritos
router.get('/api/carritos', (req, res) => {
    res.json({ carts });
});

//




module.exports = router;