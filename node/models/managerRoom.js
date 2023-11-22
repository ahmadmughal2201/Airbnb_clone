const mongoose = require('mongoose');

const managerRoomSchema = mongoose.Schema({
    MID: String,
    RID: String,
    Status: Boolean,
}, {timestamps: true});



module.exports = mongoose.model('Manager Room', managerRoomSchema);
