const payingGuest = require('../models/payingGuest');



async function addGuest (req, res){
    try {
        console.log(req.body);
        const guest = await payingGuest.create(req.body); // Product here is the schema
        res.status(201).json(guest);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

module.exports = {
    addGuest
}