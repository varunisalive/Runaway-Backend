const mongoose = require ("mongoose");

const cartSchema = new mongoose.Schema({
    cart_products: [{
        type: String
    }],
    time: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;