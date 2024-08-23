const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    cp: { // Cost Price
        type: Number,
        required: true,
        min: 0
    },
    sp: { // Selling Price
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
