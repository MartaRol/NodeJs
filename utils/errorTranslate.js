"use strict";
const errors = require('../utils/errors');

module.exports = (typeError, res, language, callback) => {
    if(typeError){
        if(language === "es-ES" || language === "ES" || language === "es"){
            res.json({success: false, message: typeError.ES});
        }

        if(language === "en-EN" || language == "EN" || language == "en"){
            res.json({success: false, message: typeError.EN});
        }

    }
};