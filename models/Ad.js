"use strict";

const mongoose = require('mongoose');

//Definimos el esquema
const adSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },    
    sale: {
        type: Boolean, 
        index: true
    },
    price: {
        type: Number,
        index: true
    },     
    image: String,     
    tags: {
        type: [String],
        index: true
    } 
}); 

//Método estático
adSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
  const query = Ad.find(filter);
  query.limit(limit);
  query.skip(skip);
  //Campos
  query.select(fields);
  query.sort(sort);
  query.exec(callback);
};
 
 //Creamos el modelo
 const Ad= mongoose.model('Ad', adSchema);

 module.exports = Ad;