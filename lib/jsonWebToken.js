"use strict";

var jwt = require('jsonwebtoken');
//var languageError = require('../utils/language');
const config = require('../config');

module.exports = (req, res, next) => {
  //Recibimos el token tanto en la url, en el cuerpo de la petición, o en la cabecera
    const token = req.query.token || req.query.token || req.headers['x-access-token'];

    if (token){
        jwt.verify(token, config.jwt.TOKEN_SECRET, (err, decoded) => {
            if (err){
                return res.json({success: false, message: 'Autenticación inválida'});
            }else{
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({success: false, message: 'No se ha especificado ningún token'});
    }
};


