"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;


conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

conn.once('open', () =>{
    console.log('Conectado a MongoDB.');

    mongoose.connection.db.listCollections().toArray(function(err, names) {
    if (err) {
        console.log(err);
        return;
    }
    names.forEach(function(e,i,a) {
        // hacer esto es una locura, 
        // cada vez que conectes con la base de datos
        // estas borrando todas las tablas!!!!
        //     mongoose.connection.db.dropCollection(e.name);
        console.log("--->>", e.name);
    });
});
});



mongoose.connect('mongodb://localhost/nodepop');
