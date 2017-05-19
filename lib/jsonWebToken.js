"use strict";

var jwt = require('jsonwebtoken');
var errorTranslate = require('../utils/errorTranslate');
const config = require('../config');
const errors = require('../utils/errors');


module.exports = (req, res, next) => {
  //Recibimos el token tanto en la url, en el cuerpo de la petición, o en la cabecera
    const token = req.query.token || req.query.token || req.headers['x-access-token'];
    var language = req.query.language || req.query.language || req.headers['accept-language'].substring(0,5);


    if (token){
        jwt.verify(token, config.jwt.TOKEN_SECRET, (err, decoded) => {
            if (err){
                return errorTranslate(errors.authentication_invalidate, res, language);
                //return res.json({success: false, message: 'Autenticación inválida'});
            }else{
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return errorTranslate(errros.authentication_token, res, language);
        //return res.status(403).send({success: false, message: 'No se ha especificado ningún token'});
    }
};


