"use strict";

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');

router.get('/', (req, res, next) => {

Ad.find().distinct('tags', (err, listTags) => {
    if (err) {
      next(err); // le decimos a express que devuelva el error
      return;
    }
    res.json({ success: true, result: listTags });
  })
});

module.exports = router;