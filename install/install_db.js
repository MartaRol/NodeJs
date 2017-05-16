"use strict"

const mongoose = require('mongoose');
const connect_db = require('../lib/connect_db');
const readDataFile = require('./readDataFile');
const adDAO = require ('./adDAO');
const async = require('async');

function loadAdvertisements(callback) {
    // elimino todos los anuncios
    adDAO.deleteAll((err, result) => {
        if (err) {
            console.log(err);
        }
        console.log ('Tabla anuncios vacía');
        
        // ahora voy a leer el fichero
        readDataFile ('anuncio.json', (err, dataJson) => {
            if (err){
                return callback(err);
            }

            // cuando lo he leido voy a hacer
            // un bucle asíncrono insertando en la base de datos
            async.concat(dataJson.ad, function iterador(item, callbackIterador) {
                adDAO.addAd(item, (err, ad) =>{
                    if(err){
                        return callbackIterador(err);
                    }
                    console.log(`Registro insertado: ${ad.nombre} (${ad._id})`);
                    callbackIterador();
                });
            }, callback);

        });
    });

}

loadAdvertisements(function(err, result) {
    if (err) {
        console.log('Error', err);
        process.exit(1);
    }
    console.log('Anuncios cargados correctamente');
    process.exit(0);
});