"use strict";

module.exports = (typeError, req, res, next) => {
        console.log("Dentro");
        console.log("Req", req.headers)
    const language = req.headers['accept-language'].substring(0,5);

    if(language === 'es-ES'){
        res.json({success: false, message: typeError.message_ES});
    }

};