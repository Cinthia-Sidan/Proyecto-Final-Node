const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const app = express();

const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Agregar path public
app.use("/static", express.static('public'))

//Routing
app.use('/', productsRouter);
app.use('/', cartsRouter);




app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});