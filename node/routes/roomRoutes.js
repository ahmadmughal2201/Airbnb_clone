const express = require("express");
const router = express.Router();
//const roomController = require('../controllers/roomController');
const multer = require('multer');
app.use(express.json());
const cors = require("cors");
app.use(cors());

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
const roomModel = require('../models/roomModel');

router.post("/room", upload.single("image"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    
  
    try {
      await Images.create({ image: imageName });
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  });

  router.get("/get-image", async (req, res) => {
    try {
      Images.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {
      res.json({ status: error });
    }
  });

/*router.post('/upload-room',upload.single("upload"), async(req, res) => {
    console.log("hello");
    try {
        console.log(req.body);
        const newRoom = await roomModel.create(req.body); // Product here is the schema
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
    console.log("Req.File", req.file);
});
*/



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
    uploadRoom
}


/*
module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require('multer');
const roomModel = require('../models/roomModel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});


const upload = multer({ storage: storage });

router.post('/upload-Room', upload.single("upload"), async (req, res) => {
    console.log("File uploaded successfully");
    try {
        // Assuming you are storing the uploaded file information in your roomModel
        const newRoom = await roomModel.create({
            // Use req.file to get the uploaded file details
            file: req.file, // Assuming 'file' is a field in your roomModel

            // Other fields from the request body
            // Example: name: req.body.name,
        });
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
});

module.exports = router;*/
