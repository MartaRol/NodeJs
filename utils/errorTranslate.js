"use strict";
const errors = require('../utils/errors');

module.exports = (typeError, res, language) => {
    console.log("Dentro de error");
    console.log(typeError);

    if(typeError){
        console.log("Dentro de error 1");
        if(language === "es-ES" || language === "ES" || language === "es"){
            console.log("Dentro de error 2");
            res.json({success: false, message: errors.typeError.ES});
        }

        if(language === "en-EN" || language == "EN" || language == "en"){
            res.json({success: false, message: errors.typeError.EN});
        }

    }
};