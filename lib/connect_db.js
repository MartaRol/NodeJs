"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;


conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

conn.once('open', () =>{
    console.log('Conectado a MongoDB.');

    mongoose.connection.db.listCollections().toArray(function(err, names) {
    if (err) {
        console.log(err);
    }
    else {
        names.forEach(function(e,i,a) {
            mongoose.connection.db.dropCollection(e.name);
            console.log("--->>", e.name);
        });
    }
});
});



mongoose.connect('mongodb://localhost/nodepop');


module.exports = connect_db;