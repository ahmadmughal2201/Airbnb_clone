const mongoose = require('mongoose');

const managerRoomSchema = mongoose.Schema({
    MID: String,
    RId: String,
    Status: String,
}, {timestamps: true});



module.exports = mongoose.model('Manager Room', managerRoomSchema);
