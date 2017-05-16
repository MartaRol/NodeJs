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

/*router.use((req, res, next) => {
  const user = basicAuth(req);
  console.log('User' , user);
  if (!user){
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.send(401, "Necesitas autenticación");
    return;
  }
  next();
});*/


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

/* GET /apiv1/advertisements*/

/*router.get('/', function(req, res, next){
  const name = req.query.name;
  const sale = req.query.sale;
  const price = req.query.price;
  const image = req.query.image;
  //const tags = req.query.tags;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const fields = req.query.fields;
  const sort = req.query.sort;

  //Filtro vacío
  const filter = {};

  if(name){
    filter.name = name;
  }

  if(sale){
    filter.sale = sale;
  }

  if(price){
    filter.price = price;
  }

  if(image){
    filter.image = image;
  }

  Ad.listenerCount(filter, limit, skip, fields, sort, (err, advertisements) =>{
    if (err){
      //Devuleve el error express
      next(err);
      return;
    }

    res.json({ success: true, result: advertisements });
  });


});*/

// POST /apiv1/advertisements
router.post('/', (req, res, next) => {
  console.log(req.body);

  // validar

  // creamos un objeto de tipo Anuncio
  const ad = new Ad(req.body);
  // lo guardamos en la base de datos
  ad.save((err, currentAd) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: currentAd});
  });
});



module.exports = router;