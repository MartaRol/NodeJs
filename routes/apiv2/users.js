"use strict";

var express = require('express');
var router = express.Router();
const User = require('../../models/User');
const sha256 = require('sha256');
const config = require('../../config');
var jwt = require('jsonwebtoken');

//GET Usuarios con filtro
router.get('/', (req, res, next) => {

  const name = req.body.name;
  const email = req.body.email;
  const key = req.body.key;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const fields = req.query.fields;
  const sort = req.query.sort;

  //Filtro vacío
  const filter = {};

  if(name){
      filter.name = name;
  }

  if(email){
      filter.email = email;
  }

  if(key){
      filter.key = key;
  }

  User.list(filter, limit, skip, fields, sort, (err, listUsers) => {
    if (err) {
      next(err);
      return;
    }

    res.json({ success: true, result: listUsers });

  });

});

//GET Usuario concreto directamente
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById({_id: id}, (err, currentUser) => {
    if (err) {
      next(err);
      return;
    }
    //Devuelve el usuario encontrado
    res.json({ success: true, result: currentUser});
  });
});

router.post('/', (req,res,next) => {
    const user = new User(req.body);
    user.key = sha256.x2(user.key);

    user.save((err, currentUser) =>{
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, result: currentUser});
    });
});


//DELETE Eliminar usuarios
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.remove({_id: id}, (err, currentUser) => {
    if (err) {
      next(err);
      return;
    }
    //Devuelve si ha sido eliminado
    res.json({ success: true, result: currentUser});
  });
});

module.exports = router;