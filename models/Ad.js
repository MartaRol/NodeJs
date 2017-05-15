"use strict";

const mongoose = require('mongoose');

//Definimos el esquema
const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true
    },    
    venta: {
        type: Boolean, 
        index: true
    },
    precio: {
        type: Number,
        index: true
    },     
    foto: String,     
    tags: {
        type: [String],
        index: true
    } 
}); 
 
 //Creamos el modelo
 const Anuncio = mongoose.model('Anuncio', anuncioSchema);

 module.exports = Anuncio;