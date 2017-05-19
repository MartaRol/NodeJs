"use strict";

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');
const jwt = require('../../lib/jsonWebToken');

router.get('/', jwt,  (req, res, next) => {

  const name = req.query.name;
  const sale = req.query.sale;
  const price = req.query.price;
  const tags = req.query.tags;
  const includeTotal = req.query.includeTotal;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const fields = req.query.fields;
  const sort = req.query.sort;

  //Filtro vacío
  const filter = {};

  if(name){
      filter.name = new RegExp ('^' + name);
  }

  if(sale && (sale === "true" || sale === "false" || sale.toLowerCase() === 'busqueda' || sale.toLowerCase() === 'busca')){
    if (sale.toLowerCase() === 'busqueda' || sale.toLowerCase() === 'busca'){
      filter.sale = 'false';
    }
      filter.sale = sale;
  }

  if(price){
    if(price.indexOf("-") === -1){
      filter.price = price;

    }else{
      //Recojo el rango de precio para ubicarlo
      let range = price.split("-");
      
      //Anuncios con precio incluido entre valores
      if(range[0] && range[1]){
          filter.price = {$gte: range[0], $lte: range[1]};
      };

      //Anuncios con precio mayor
      if (range[0] && !range[1]){
        filter.price = {$gte: range[0]};
      }

      //Anuncios con precio menor
      if(range[1] && !range[0]){
        filter.price = {$lte: range[1]};
      }
    }
  }

  if(tags){
      //Recojo todos los tags que vienen separados por "," para tratarlos
      let allTags = tags.split(",");
      console.log("Tags", allTags);

      filter.tags = {$in: allTags};
  }

  Ad.list(filter, limit, skip, fields, sort, (err, listAds) => {
    if (err) {
      next(err); // le decimos a express que devuelva el error
      return;
    }
    
    if(includeTotal && includeTotal === 'true'){
      var total = listAds.length
    }
    res.json({ success: true, result: listAds, total });

  });

});

//GET Anuncio concreto
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Ad.findById({_id: id}, (err, currentAd) => {
    if (err) {
      next(err);
      return;
    }
    //Devuelve anuncio concreto
    res.json({ success: true, result: currentAd});
  });
});

// POST /apiv2/advertisements
router.post('/', (req, res, next) => {
  // creamos un objeto de tipo Anuncio
  const ad = new Ad(req.body);
  // Almaceno en BBDD
  ad.save((err, currentAd) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: currentAd});
  });
});

//DELETE Eliminar anuncios
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Ad.remove({_id: id}, (err, currentAd) => {
    if (err) {
      next(err);
      return;
    }
    //Devuelve si ha sido eliminado
    res.json({ success: true, result: currentAd});
  });
});


module.exports = router;