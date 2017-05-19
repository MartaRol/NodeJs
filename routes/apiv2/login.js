"use strict";

var express = require('express');
var router = express.Router();
const User = require('../../models/User');
const config = require('../../config');
var jwt = require('jsonwebtoken');
const sha256 = require('sha256');

router.post('/', (req, res, next) => {

    User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
        if (err){
            next(err);
            return;
        }
        if(!user){
            res.json({success: false, message: 'Necesita autenticación. Credenciales incorrectos.'});
        }else {

            //Compruebo contraseña
            if(user.key != sha256.x2(req.body.key)){
                res.json({success: false, message: 'Contraseña incorrecta'});
            }else{
                //Si se encuentra el usuario y la contraseña es correcta se crea el token
                var token = jwt.sign(user, config.jwt.TOKEN_SECRET, {
                    expiresIn: config.jwt.expiresInMinutes
                });
                res.json({ success: true, message: "Usuario autenticado correctamente", token: token});
            }
        }
    })
})

module.exports = router;