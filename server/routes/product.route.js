const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product.controller.js');

router.post('/product/create', createProduct);
router.get('/product/getallproducts', getAllProducts);
router.get('/product/getsingleproduct', getSingleProduct);
router.put('/product/update', updateProduct);
router.delete('/product/delete', deleteProduct);

module.exports = router;