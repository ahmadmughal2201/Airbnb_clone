const rate = require('../models/ratingModel');

async function addRating (req, res){
    try {
        console.log(req.body);
        const r = await rate.create(req.body); // Product here is the schema
        res.status(201).json(r);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

module.exports = {
    addRating
}