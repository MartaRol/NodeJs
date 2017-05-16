"use strict"

const mongoose = require('mongoose');
const mmodelUser = require('../models/User');


// Alta Usuario
exports.addUser = function (newUser, callback){
    let User = new mmodelUser(newUser);

    User.save( (err, User) => {
        if (err){
            return callback (err);
        }

        callback (null, User);
    }); 
}

//Listar Usuarios
exports.findAllUsers = function (callback){
    mmodelUser.find ((err, list) => {
        if(err){
            return callback(err);
        }

        callback (null, list);
    });
}


//Buscar Usuario
exports.findUser = function (idUser, callback){
    mmodelUser.findById({_id: idUser}, (err, User) => {
        if(err){
            return callback(err);
        }

        callback (null, User);
    });
}

//Borrar Usuario
exports.deleteUser = function (idUser, callback ){
    mmodelUser.remove({_id: idUser}, (err, User) => {
        if (err){
            return callback (err);
        }

        callback (null, User);
    });
}

//Borrar todos los usuarios
exports.deleteAll = function ( callback ){
    mmodelUser.remove({}, (err, User) => {
        if (err){
            return callback (err);
        }

        callback (null, User);
    });
}