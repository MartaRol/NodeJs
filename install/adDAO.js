"use strict"

const mongoose = require('mongoose');

const mmodelAd = require('../models/Ad');

// Alta Anuncio
exports.addAd = function (newAd, callback){
    let Ad = new mmodelAd(newAd);

    Ad.save( (err, Ad) => {
        if (err){
            return callback (err);
        }

        callback (null, Ad);
    }); 
}

//Listar Anuncios
exports.findAllAds = function (callback){
    mmodelAd.find ((err, list) => {
        if(err){
            return callback(err);
        }

        callback (null, list);
    });
}


//Buscar Anuncio
exports.findAd = function (idAd, callback){
    mmodelAd.findById({_id: idAd}, (err, Ad) => {
        if(err){
            return callback(err);
        }

        callback (null, Ad);
    });
}

//Borrar Anuncio
exports.deleteAd = function (idAd, callback ){
    mmodelAd.remove({_id: idAd}, (err, Ad) => {
        if (err){
            return callback (err);
        }

        callback (null, Ad);
    });
}

//Borrar todos los Anuncios
exports.deleteAll = function ( callback ){
    mmodelAd.remove({}, (err, Ad) => {
        if (err){
            return callback (err);
        }

        callback (null, Ad);
    });
}