"use strict"

const mongoose = require('mongoose');
const connect_db = require('../lib/connect_db');
const readDataFile = require('./readDataFile');
const adDAO = require ('./adDAO');
const userDAO = require('./userDAO');
const async = require('async');

let usersLoaded = false;
let adsLoaded = false;

//Cargo los anuncios
function loadAdvertisements(callback) {
    // elimino todos los anuncios
    adDAO.deleteAll((err, result) => {
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
                adDAO.addAd(item, (err, ad) =>{
                    if(err){
                        console.log("aaa");
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
    userDAO.deleteAll((err, result) => {
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
                userDAO.addUser(item, (err, user) =>{
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