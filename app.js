const express = require('express');

const PORT = 8080;

const ProductManager = require('./ProductManager');
const productos = new ProductManager('./data.json');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

    const product = await productos.getProducts();


    const { limit } = req.query;

    if (limit) {
        let listProduct = product.slice(0, limit);

        return res.status(220).json({
            status: "success",
            data: listProduct
        })


    } else {
        return res.status(220).json({
            status: "success",
            data: product
        })

    }

})

app.get('/products/:id', async (req, res) => {

    const product = await productos.getProducts();


    const { id } = req.params;


    const p = product.find(p => p.id === Number(id));

    if (!p) {
        return res.status(404).json({
            status: "error",
            error: "producto no existente."
        })
    }

    return res.status(220).json({
        status: "success",
        data: p
    })


})


app.listen(PORT, () => {
    console.log("El servidor esta levantado y corriendo por el puerto 8080");
});