const roomModel = require('../models/roomModel');
const fs = require("fs");
const slugify = require("slugify"); 
const util = require('util');
const formidable = require("express-formidable");
const readFileAsync = util.promisify(fs.readFile);
const roomAudit = require('./roomAuditController');
const saveLogs = require("./backendLogController");

async function getImage(req, res){
    try {
      roomModel.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {
      saveLogs(error.message, "/get-image", "Get");
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

    roomAudit(newRoom._id,"Insert","-",newRoom);

    console.log("executed");
    return res.status(200).json({
      message: 'Added room successfully',
      id: newRoom._id,
      city: newRoom.city,
  });
  } catch (error) {
    console.error(error);
    saveLogs(error.message, "/add-Room", "POST");
    return res.status(500).json({ apierror: error.message });
  }
}

async function singleRoom(req, res){
  console.log("Room Id to find is: ", req.params.id)
    try {
      const newRoom = await roomModel
        .findById(req.params.id)
        .select("-photo");
      res.status(200).send({
        success: true,
        message: "Single Room Fetched",
        newRoom,
      });
    } catch (error) {
      console.log(error);
      saveLogs(error.message, "/get-single-room/:id", "Get");
      res.status(500).send({
        success: false,
        message: "Eror while getitng single room",
        error,
      });
    }
  };
   async function getSingle(req, res){
    const roomId = req.params.id;
    console.log("Room needed: ", roomId);
  
    try {
      const foundRoom = await roomModel.findById(roomId).select('-photo');
  
      if (!foundRoom) {
        return res.status(404).json({
          success: false,
          message: 'Room not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Single Room Fetched',
        newRoom: foundRoom,
      });
    } catch (error) {
      console.log(error);
      saveLogs(error.message, "/get-single-room/:id", "Get");
      res.status(500).json({
        success: false,
        message: 'Error while getting single room',
        error: error.message,
      });
    }
  };

  async function getRoomByType (req, res) {
    try {
      const type = req.params.type;
  
      // Validate the type parameter if needed
  
      const rooms = await roomModel
        .find({ type: type })
        .populate("type")
        .select("-img")
        .limit(50)
        .sort({ createdAt: -1 });
  
      res.status(200).send({
        success: true,
        countTotal: rooms.length,
        message: `Rooms of type ${type}`,
        rooms,
      });
    } catch (error) {
      console.log(error);
      // Assuming you have a saveLogs function for error logging
      // saveLogs(error.message, "/get-rooms-by-type", "Get");
      res.status(500).send({
        success: false,
        message: "Error in getting rooms by type",
        error: error.message,
      });
    }
  };

async function getRooms(req,res){
  try {
    const rooms = await roomModel
      .find({})
      .populate("type")
      .select("-img")
      .limit(50)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: rooms.length,
      message: "AllRoooms ",
      rooms,
    });
  } catch (error) {
    console.log(error);
    saveLogs(error.message, "/get-rooms", "Get");
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
    saveLogs(error.message, "/get-roomImage/:id", "Get");
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

      roomAudit(newRoom._id,"Insert","-",newRoom);

      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ apierror: error.message });
    }
  });
}

async function deleteRoom(req, res){
  const roomId = req.params.id;
  console.log("The api rrom Id: ", roomId);
  try {
    // Find the room by ID
    const roomToDelete = await roomModel.findById(roomId).select();

    console.log("Room to Delete: ", roomToDelete);

    if (!roomToDelete) {
      return res.status(404).json({ apierror: 'Room not found' });
    }

    // Delete the room from the database
    await roomModel.deleteOne({ _id: roomId });

    roomAudit(roomId,"Delete", roomToDelete[0], "-");

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    saveLogs(error.message, "/delete-room/:id", "Delete");
    res.status(500).json({ apierror: error.message });
  }
}

async function updateRoom(req, res) {
  const roomId = req.params.id;

  try {
    // Find the room by ID
    const existingRoom = await roomModel.findById(roomId);
    const oldRoom = await roomModel.findById(roomId);
    if (!existingRoom) {
      return res.status(404).json({ apierror: 'Room not found' });
    }
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
    } = req.body;

    // Update the room fields
    existingRoom.city = city || existingRoom.city;
    existingRoom.country = country || existingRoom.country;
    existingRoom.rent = rent || existingRoom.rent;
    existingRoom.location = location || existingRoom.location;
    existingRoom.des = des || existingRoom.des;
    existingRoom.type = type || existingRoom.type;
    existingRoom.history = history || existingRoom.history;
    existingRoom.rating = rating || existingRoom.rating;
    existingRoom.trending = trending || existingRoom.trending;
    existingRoom.sleep = sleep || existingRoom.sleep;
    existingRoom.views = views || existingRoom.views;
    existingRoom.luxury = luxury || existingRoom.luxury;
    existingRoom.farm = farm || existingRoom.farm;
    existingRoom.mountain = mountain || existingRoom.mountain;
    existingRoom.exciting = exciting || existingRoom.exciting;
    existingRoom.tropical = tropical || existingRoom.tropical;

    // Save the updated room to the database
    await existingRoom.save();

    roomAudit(roomId, "Update", oldRoom, existingRoom);

    res.status(200).json(existingRoom);
  } catch (error) {
    res.status(500).json({ apierror: error.message });
  }
}


async function searchRoom(req, res){
  try {
    const { keyword } = req.params;
    const resutls = await roomModel
      .find({
        $or: [
          { city: { $regex: keyword, $options: "i" } },
          { des: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

module.exports = {
    getImage,
    addRoom,
    upload,
    getRooms,
    singleRoom,
    searchRoom,
    getPhoto,
    getSingle,
    updateRoom,
    deleteRoom,
    getRoomByType
}