const multer = require('multer');
const roomModel = require('../models/roomModel');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
})

const upload = multer({storage: storage});

async function addRoom (req, res){
    console.log(req.body);
    const imageName = req.file.filename;
  
    /*try {
      await Images.create({ image: imageName });
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }*/

    try {
        console.log(req.body);
        const newRoom = await roomModel.create(req.body); // Product here is the schema
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

async function uploadRoom(req, res) {
    try {
        console.log(req.body);
        const newRoom = await roomModel.create(req.body); // Product here is the schema
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

module.exports = {
    uploadRoom,
    addRoom
}