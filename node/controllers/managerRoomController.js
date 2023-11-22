const mrmodel = require('../models/managerRoom');

async function addManagerRoom (req, res){
    try {
        console.log(req.body);
        const newRoom = await mrmodel.create(req.body); 
        console.log("newRoom manager", newRoom.MID);
        console.log("newRoom room", newRoom.RID);
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

module.exports = {
    addManagerRoom
}