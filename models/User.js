"use strict";

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({     
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true, 
        unique: true,
        required: true
    },     
    key: {
        type: String,
        required: true
    } 

}); 

//Método estático
userSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
  const query = User.find(filter);
  query.limit(limit);
  query.skip(skip);
  //Campos
  query.select(fields);
  query.sort(sort);
  query.exec(callback);
};


//Creamos el modelo
 const User = mongoose.model('User', userSchema);

 module.exports = User;
