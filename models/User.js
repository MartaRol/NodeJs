"use strict";

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({     
    nombre: String,     
    email: {
        type: String,
        index: true, 
        unique: true
    },     
    clave: String }); 

//Creamos el modelo
 const Usuario = mongoose.model('Usuario', usuarioSchema);