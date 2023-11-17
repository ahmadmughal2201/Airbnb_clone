const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    city: String,
    country: String,
    rent: Number,
    location: String,
    img: {
      data: Buffer,
      contentType: String,
    },
    des: String,
    type: String,
    history: String,
    rating: Number,
    trending: Boolean,
    sleep: Boolean,
    views: Boolean,
    luxury: Boolean,
    farm: Boolean,
    mountain: Boolean,
    exciting: Boolean,
    tropical: Boolean,
},
{
    collection: "Rooms",
  }, {timestamps: true});



module.exports = mongoose.model('Rooms', roomSchema);
