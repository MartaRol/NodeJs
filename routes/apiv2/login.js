"use strict";

var express = require('express');
var router = express.Router();
const User = require('../../models/User');
const config = require('../../utils/config');
var jwt = require('jsonwebtoken');
const sha256 = require('sha256');
var errorTranslate = require('../../utils/errorTranslate');
const errors = require('../../utils/errors');

router.post('/', (req, res, next) => {
    //Recojo el idioma
    var language = req.query.language || req.query.language || req.headers['accept-language'].substring(0,5);
    User.findOne({email: req.body.email}, (err, user) => {
        if (err){
            next(err);
            return;
        }
        if(!user){
            return errorTranslate(errors.login_invalid_credentials, res, language);
        }else {

            //Compruebo contraseña
            if(user.key != sha256.x2(req.body.key)){
                return errorTranslate(errors.login_invalid_credentials, res, language);
            }else{
                //Si se encuentra el usuario y la contraseña es correcta se crea el token
                var token = jwt.sign(user, config.jwt.TOKEN_SECRET, {
                    expiresIn: config.jwt.expiresInSeconds
                });
                res.json({ success: true, message: "Usuario autenticado correctamente", token: token});
            }
        }
    })
})

module.exports = router;