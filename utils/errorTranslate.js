"use strict";
const errors = require('../utils/messages.json');

module.exports = (typeError, res, language, callback) => {
    if(typeError){
        if(language === "es-ES" || language === "ES" || language === "es"){
            res.json({success: false, message: typeError.es});
        }

        if(language === "en-EN" || language == "EN" || language == "en"){
            res.json({success: false, message: typeError.en});
        }

    }
};