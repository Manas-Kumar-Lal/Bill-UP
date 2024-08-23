const Product = require('../models/product.model.js');
const asyncHandler = require('../utilities/asyncHandler.utility.js')
const errorHandler = require('../utilities/errorHandler.utility.js')

// Controller to create a product
const createProduct = asyncHandler(async (req, res, next) => {
    const { productName, quantity, cp, sp } = req.body;

    // Validate request body
    if (!productName || !quantity || !cp || !sp) {
        return next(new errorHandler("productName, quantity, cp, and sp must be provided"));
    }

    // Trim the productName and make it case-insensitive
    const trimmedProductName = productName.trim().toLowerCase();

    // Check if the productName already exists (case-insensitive)
    const existingProduct = await Product.findOne({ productName: trimmedProductName });
    if (existingProduct) {
        return next(new errorHandler("Product already exists"));
    }
    // Create a new product instance
    const responseData = await Product.create({
        productName: trimmedProductName,
        quantity,
        cp,
        sp
    });
    console.log(productName);

    // Respond with the saved product
    res.status(201).send({
        success: true,
        responseData,
    });
});

// Controller to get all products
const getAllProducts = asyncHandler(async (req, res, next) => {
    // Fetch all products from the database
    const products = await Product.find();

    if (!products) {
        return next(new errorHandler("No products found"));
    }

    // Respond with the list of products
    res.send({
        success: true,
        responseData: {
            productsCount: products.length,
            products
        }
    });
});

// Controller to get all products
const getSingleProduct = asyncHandler(async (req, res, next) => {
    const { productID } = req.body;

    // Validate request body
    if (!productID) {
        return next(new errorHandler("productID must be provided"));
    }

    // Check if the product exists
    const product = await Product.findById(productID);
    if (!product) {
        return next(new errorHandler("Product not found"));
    }

    // Respond with the list of products
    res.send({
        success: true,
        responseData: product
    });
});

// Controller to update a product
const updateProduct = asyncHandler(async (req, res, next) => {
    const { productID, productName, quantity, cp, sp } = req.body;
    console.log(productID, productName, quantity, cp, sp);
    // Validate request body
    if (!productID || !productName || !quantity || !cp || !sp) {
        return next(new errorHandler("productID, productName, quantity, cp, and sp must be provided"));
    }

    // Check if the product exists
    const product = await Product.findById(productID);
    if (!product) {
        return next(new errorHandler("Product not found"));
    }

    // Check if the productName is being changed and if the new productName is already taken by another product
    if (productName !== product.productName) {
        const existingProductWithName = await Product.findOne({ productName });
        if (existingProductWithName) {
            return next(new errorHandler("Product with the same name already exists"));
        }
    }

    // Update the product fields
    product.productName = productName;
    product.quantity = quantity;
    product.cp = cp;
    product.sp = sp;

    // Save the updated product to the database
    const updatedProduct = await product.save();

    // Respond with the updated product
    res.send({
        success: true,
        responseData: updatedProduct,
    });
});

// Controller to delete a product
const deleteProduct = asyncHandler(async (req, res, next) => {
    const { productID } = req.body;

    // Validate request body
    if (!productID) {
        return next(new errorHandler("productID must be provided"));
    }

    // Check if the product exists
    const product = await Product.findById(productID);
    if (!product) {
        return next(new errorHandler("Product not found"));
    }

    // Delete the product from the database
    await product.deleteOne();

    // Respond with success message
    res.send({
        success: true,
        responseData: {
            message: "Product deleted successfully",
        }
    });
});

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
