const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    shopId: { type: Number, required: true },
});

const Price = mongoose.model("Price", priceSchema);

module.exports = { Price };
