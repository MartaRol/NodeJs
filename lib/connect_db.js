"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

//Librería de promesas de mongoose
mongoose.Promise = global.Promise;


conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

conn.once('open', () =>{
    console.log('Conectado a MongoDB.');
});
/*Mostrar las tablas que hay en BBDD
    mongoose.connection.db.listCollections().toArray(function(err, names) {
    if (err) {
        console.log(err);
        return;
    }
    names.forEach(function(e,i,a) {
        console.log("--->>", e.name);
    });
});
*/


mongoose.connect('mongodb://localhost/nodepop');
