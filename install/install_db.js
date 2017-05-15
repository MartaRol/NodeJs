"use strict"

const mongoose = require('mongoose');
const conection = require('.lib/connect_db');
const readDataFile = require('./readDataFile');
const adDAO = require ('./adDAO');

function loadAdvertisements(callback) {
    adDAO.findAllAds((err, list) =>{
        if (err){
            return callback(err);
        }

        let i = 0;
        if(list.length > 0){
            mongoose.db.anuncios.deleteMany({}, (err, result) => {
               if (err) {
                    console.log(err);
                }
            });

        console.log ('Tabla anuncios vacía');

        }
    });

    readDataFile ('anuncio.json', (err, dataJson) => {
        if (err){
            return callback(err);
        }

        for(let i=0; i< dataJson.ad.length; i++){
            adDAO.addAd(dataJson.ad[indice], (err, ad) =>{
                if(err){
                    return callback(err);
                }
                console.log('Registro insertado: ');
            });
        }
    });

    callback(null, 'Anuncios cargados correctamente');
}

