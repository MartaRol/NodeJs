"use strict";

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');

router.get('/', (req, res, next) => {
  Ad.find().exec((err, listAds) => {
    if (err){
      next(err);
      return;
    }

      res.json({success: true, result: listAds});
  });


});


module.exports = router;