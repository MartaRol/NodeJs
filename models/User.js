"use strict";

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({     
    name: String,     
    email: {
        type: String,
        index: true, 
        unique: true
    },     
    key: String 

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
