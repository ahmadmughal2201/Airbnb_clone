const mongoose = require("mongoose");

const RoomAuditScheema = new mongoose.Schema({
    RID: String,
    action: String,
    oldValue: Object,
    newValue: Object
}, {timestamps: true})

module.exports = mongoose.model('RoomAudit', RoomAuditScheema);