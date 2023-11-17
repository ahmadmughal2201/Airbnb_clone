const roomModel = require('../models/roomModel');
const fs = require("fs");
const slugify = require("slugify"); 
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

async function getImage(req, res){
    try {
      roomModel.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {
      res.json({ status: error });
    }
}

/*const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });*/

async function upload(req, res) {
  console.log("Request body:", req.body);
  console.log("Request fields:", req.fields);
  console.log("Request files:", req.files);

  try {
    const {
      city, country, rent, location, des, type, history, rating, trending,
      sleep, views, luxury, farm, mountain, exciting, tropical
    } = req.fields;

    const { img } = req.files;

    // Validate required fields
    const requiredFields = ['city', 'country', 'rent', 'location', 'des', 'type', 'history', 'rating', 'trending', 'sleep', 'views', 'luxury', 'farm', 'mountain', 'exciting', 'tropical'];
    const missingField = requiredFields.find(field => field === 'history' ? (history === undefined || history.trim() === '') : !req.fields[field]);

    if (missingField) {
      return res.status(500).send({ error: '${missingField} is required' });
    }

    // Validate image size
    if (img && img.size > 1000000) {
      return res.status(400).send({ error: "Photo size should be less than 1 MB" });
    }

    // Create a new room using the data from req.fields
    const newRoom = new roomModel({
      city, country, rent, location, des, type, history, rating, trending,
      sleep, views, luxury, farm, mountain, exciting, tropical,
    });

    // If there's an image, set the img data and contentType
    if (img) {
      // Use asynchronous file reading
      newRoom.img.data = await readFileAsync(img.path);
      newRoom.img.contentType = img.type;
      console.log("got image");
    }

    // Save the new room to the database
    await newRoom.save();

    console.log("executed");
    return res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ apierror: error.message });
  }
}

async function getRooms(req,res){
  try {
    const rooms = await roomModel
      .find({})
      .populate("type")
      .select("-img")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: rooms.length,
      message: "AllRoooms ",
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting rooms",
      error: error.message,
    });
  }
};

async function getPhoto(req, res){
  try {
    const room = await roomModel.findById(req.params.id).select("img");
    if (room.img.data) {
      res.set("Content-type", room.img.contentType);
      return res.status(200).send(room.img.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

async function addRoom (req, res){
    console.log(req.body);

    const form = formidable();

    form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ apierror: err.message });
    }

    try {
      const {
        city,
        country,
        rent,
        location,
        des,
        type,
        history,
        rating,
        trending,
        sleep,
        views,
        luxury,
        farm,
        mountain,
        exciting,
        tropical,
      } = fields;

      const { img } = files;

      // Your validation logic here...

      // Create a new room using the data from fields
      const newRoom = new roomModel({
        city,
        country,
        rent,
        location,
        des,
        type,
        history,
        rating,
        trending,
        sleep,
        views,
        luxury,
        farm,
        mountain,
        exciting,
        tropical,
      });

      // If there's an image, set the img data and contentType
      if (img) {
        newRoom.img.data = fs.readFileSync(img.path);
        newRoom.img.contentType = img.type;
      }

      // Save the new room to the database
      await newRoom.save();

      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ apierror: error.message });
    }
  });
}


module.exports = {
    getImage,
    addRoom,
    upload,
    getRooms,
    getPhoto
}