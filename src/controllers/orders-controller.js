const { Order, orderJoiSchema } = require("../models/mongo-order-schema.js");

const getOrders = async (req, res) => {
    try {
        const email = req.query.email;
        const orders = await Order.find({ "customer.email": email });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postOrder = async (req, res) => {
    try {
        const validationResult = orderJoiSchema.validate(req.body);

        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }

        const order = new Order(req.body);
        const savedOrder = await order.save();

        res.status(200).json({ message: "Order submitted successfully", order: savedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getOrders,
    postOrder,
};
