require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_STRING);

const orderSchema = Joi.object({
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

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
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
    })
);

const pharmSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    addresses: { type: Array, required: true },
    phone: { type: String, required: true },
});
const priceSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    shopId: { type: Number, required: true },
});
app.post("/orders", async (req, res) => {
    try {
        const validationResult = orderSchema.validate(req.body);

        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }

        const order = new Order(req.body);
        const savedOrder = await order.save();

        res.status(200).json({ message: "Order submitted successfully", order: savedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const Price = mongoose.model("Price", priceSchema);
const Pharm = mongoose.model("Pharm", pharmSchema);

app.get("/pharms", async (req, res) => {
    try {
        const pharms = await Pharm.find();
        res.json(pharms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/pharms/:id/prices", async (req, res) => {
    const id = req.params.id;
    try {
        const prices = await Price.find({ shopId: id });
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});