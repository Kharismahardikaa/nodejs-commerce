const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require('dotenv/config');

//middleware
app.use(express.json())
app.use(morgan('tiny'))


const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    },
})

const Product = mongoose.model('Product', productSchema)


const api = process.env.API_URL;

app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find()
    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save()
        .then((createdProduct => {
            res.status(201).json(createdProduct)
        })).catch((error) => {
        res.status(500).json({
            error: error,
            success: false
        })
    })
})

mongoose.connect(process.env.CONNECTION_STRING,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: `eshop-database`
})
    .then(() => {
        console.log('Database is ready to use...')
    }).catch((error) => {
        console.log(error)
    });

app.listen(3000, () => {
    console.log('Server is running....')
    console.log(api)
})