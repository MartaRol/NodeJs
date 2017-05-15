"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Ad');


/* GET /apiv1/anuncios*/
router.get('/', function(req, res, next) {

  Anuncio.find().exec((err, advertisements)  => {
    if (err){
      next(err);
      return;
    }
  });

  res.json({ success: true, result: advertisements});
});

module.exports = router;