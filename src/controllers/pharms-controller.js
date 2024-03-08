const { Pharm } = require("../models/mongo-pharm-schema.js");
const { Price } = require("../models/mongo-price-schema.js");

const getPharms = async (_, res) => {
    try {
        const pharms = await Pharm.find();
        res.json(pharms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPrices = async (req, res) => {
    const id = req.params.id;
    try {
        const prices = await Price.find({ shopId: id });
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPharms,
    getPrices,
};
