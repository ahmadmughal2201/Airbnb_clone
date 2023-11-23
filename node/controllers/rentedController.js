const rm = require('../models/rentedModel');



async function addRented (req, res){
    try {
        console.log(req.body);
        const renmo = await rm.create(req.body); // Product here is the schema
        res.status(201).json(renmo);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

module.exports = {
    addRented
}