"use strict";

var jwt = require('jsonwebtoken');
var errorTranslate = require('../utils/errorTranslate');
const config = require('../utils/config');
const errors = require('../utils/messages.json');


module.exports = (req, res, next) => {
  //Recibimos el token tanto en la url, en el cuerpo de la petición, o en la cabecera
    const token = req.query.token || req.query.token || req.headers['x-access-token'];
    var language = req.query.language || req.query.language || req.headers['accept-language'].substring(0,5);

    if (token){
        jwt.verify(token, config.jwt.TOKEN_SECRET, (err, decoded) => {
            if (err){
                return errorTranslate(errors.FAILED_AUTHENTICATE, res, language);
            }else{
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return errorTranslate(errors.AUTHENTICATION_TOKEN, res, language);
    }
};


