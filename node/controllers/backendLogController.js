const backendLogModel = require("../models/backendLogModel");

async function saveLogs(ErrorMessage, pageUrl, request){
    const log = new backendLogModel({ErrorMessage, pageUrl, request});
    await log.save();

    return;
}

module.exports = saveLogs;