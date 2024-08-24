const mongoose = require('mongoose');

// Define the schema for a Bill
const BillSchema = new mongoose.Schema({
    billNumber: {
        type: String,
        required: true,
        trim: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    products: [
        {
            productID: {
                type: String,
                required: true,
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema and export it
const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;
