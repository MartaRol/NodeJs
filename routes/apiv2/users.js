"use strict";

var express = require('express');
var router = express.Router();
const User = require('../../models/User');
const sha256 = require('sha256');

router.get('/', (req, res, next) => {

  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.key;

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

module.exports = router;