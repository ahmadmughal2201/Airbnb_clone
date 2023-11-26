const FrontendLog = require("../models/frontendLogModel");

async function frontendLogController(req,res){
    const ErrorMessage = req.body.message;
    const pageUrl = req.body.url;
    const portal = req.body.portal;

    console.log(req.body);
    const log = new FrontendLog({ErrorMessage, pageUrl, portal});
    await log.save();

    return res.status(200).json({
        message: 'Log Saved',
    });
}

module.exports = frontendLogController;