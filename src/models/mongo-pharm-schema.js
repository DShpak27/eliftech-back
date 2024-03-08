const mongoose = require("mongoose");

const pharmSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    addresses: { type: Array, required: true },
    phone: { type: String, required: true },
});

const Pharm = mongoose.model("Pharm", pharmSchema);

module.exports = { Pharm };
