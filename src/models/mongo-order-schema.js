const mongoose = require("mongoose");
const Joi = require("joi");

const orderJoiSchema = Joi.object({
    totalPrice: Joi.string().required(),
    customer: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
    }).required(),
    items: Joi.array()
        .items(
            Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().integer().min(1).required(),
                imageUrl: Joi.string().uri().required(),
                storeId: Joi.string().required(),
                store: Joi.string().required(),
            })
        )
        .min(1)
        .required(),
});

const orderSchema = new mongoose.Schema({
    totalPrice: String,
    createdAt: { type: Date, default: new Date() },
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String,
    },
    items: [
        {
            id: String,
            name: String,
            price: Number,
            quantity: Number,
            imageUrl: String,
            storeId: String,
            store: String,
        },
    ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, orderJoiSchema };
