const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'please fill the product title']
        },
        description: {
            type: String,
        },
        price: {
            type: String,
            required: [true, 'please fill the product price']
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('product', productSchema)