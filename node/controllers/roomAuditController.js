const roomAuditModel = require("../models/roomAuditModel");

async function roomAudit(RID, action, oldValue, newValue){
    const audit = new roomAuditModel({RID, action, oldValue, newValue});

    await audit.save();
    return;
}

module.exports = roomAudit;