"use strict"

const mongoose = require('mongoose');
const connect_db = require('../lib/connect_db');
const readDataFile = require('./readDataFile');
const async = require('async');
const mmodelUser = require('../models/User');
const mmodelAd = require('../models/Ad');
const sha256 = require('sha256');
const path = require('path');  

let usersLoaded = false;
let adsLoaded = false;

//Cargo los anuncios
function loadAdvertisements(callback) {
    // elimino todos los anuncios
    mmodelAd.remove({},(err, result) =>{
        if (err) {
            console.log(err);
        }
        console.log ('Tabla anuncios vacía');
        
        // ahora voy a leer el fichero
        readDataFile ('advertisements.json', (err, dataJson) => {
            if (err){
                return callback(err);
            }

            // cuando lo he leido voy a hacer
            // un bucle asíncrono insertando en la base de datos
            async.concat(dataJson.ad, function iterador(item, callbackIterador) {
                const ad = new mmodelAd(item);
                ad.image = path.join('/image/ads', ad.image);
                 ad.save(item, (err, ad) =>{
                    if(err){
                        return callbackIterador(err);
                    }
                    console.log(`Registro insertado: ${ad.name} (${ad._id})`);
                    callbackIterador();
                });
            }, callback);

        });
    });

}

loadAdvertisements(function(err, result) {
    if (err) {
        console.log('Error', err);
        if(usersLoaded) {
            process.exit(1);
        }
    }
    console.log('Anuncios cargados correctamente');
    adsLoaded = true;
    if(usersLoaded) {
        process.exit(0);
    }
});


//Cargo los usuarios

function loadUsers(callback) {
    // elimino todos los usuarios
     mmodelUser.remove({}, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log ('Tabla usuarios vacía');
        
        // ahora voy a leer el fichero
        readDataFile ('users.json', (err, dataJson) => {
            if (err){
                return callback(err);
            }

            // cuando lo he leido voy a hacer
            // un bucle asíncrono insertando en la base de datos
            async.concat(dataJson.user, function iterador(item, callbackIterador) {
                const user = new mmodelUser(item);
                user.key = sha256.x2(user.key);
                user.save(item, (err, user) =>{
                    if(err){
                        return callbackIterador(err);
                    }
                    console.log(`Registro insertado: ${user.name} (${user._id})`);
                    callbackIterador();
                });
            }, callback);

        });
    });

}

loadUsers(function(err, result) {
    if (err) {
        console.log('Error', err);
        if(adsLoaded) {
            process.exit(1);
        }
    }
    usersLoaded = true;
    console.log('Usuarios cargados correctamente');
    if(adsLoaded) {
        process.exit(0);
    }   
});