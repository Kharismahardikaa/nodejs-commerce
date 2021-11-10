const express = require('express');
const {Product} = require('../models/product')
const router = express.Router();
const model = Product;

router.get(`/`, async (req, res) => {
    const productList = await model.find()
    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
})

router.post(`/`, (req, res) => {
    const product = new model({
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

module.exports = router;