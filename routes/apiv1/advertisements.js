"use strict";

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');
const basicAuth = require('../../lib/basicAuth');
//const basicAuth = require('basic-auth');

router.get('/', (req, res, next) => {
  Ad.find().exec((err, listAds) => {
    if (err){
      next(err);
      return;
    }

      res.json({success: true, result: listAds});
  });


});

/* GET /apiv1/anuncios*/
/*router.get('/', basicAuth, function(req, res, next) {

  Ad.find().exec((err, advertisements)  => {
    if (err){
      next(err);
      return;
    }
  });

  res.json({ success: true, result: advertisements});
});*/

module.exports = router;