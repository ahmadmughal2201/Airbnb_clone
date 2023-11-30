const express = require("express");
const formidable = require("express-formidable");
const app = express.Router();
const roomController = require('../controllers/roomController');



const roomModel = require('../models/roomModel');


app.get("/get-image", roomController.getImage);

app.post("/upload-image", formidable(), roomController.upload);

app.get("/get-rooms", roomController.getRooms);

app.get("/get-room-type/:type", roomController.getRoomByType);

app.get("/get-roomImage/:id", roomController.getPhoto);

app.get("/get-single-room/:id" , roomController.getSingle);

app.get("/get-single-room-manager/:id" , roomController.getSingle);

app.put("/update-room/:id", roomController.updateRoom);

app.delete("/delete-room/:id", roomController.deleteRoom);




module.exports = app;



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

