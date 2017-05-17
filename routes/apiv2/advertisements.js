"use strict";

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');
const basicAuth = require('../../lib/basicAuth');
//const basicAuth = require('basic-auth');

router.get('/', (req, res, next) => {

  const name = req.query.name;
  const sale = req.query.sale;
  const price = req.query.price;
  const tags = req.query.tags;
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

  console.log("Filtro" , filter);

  Ad.list(filter, limit, skip, fields, sort, (err, listAds) => {
    if (err) {
      next(err); // le decimos a express que devuelva el error
      return;
    }

    res.json({ success: true, result: listAds });

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
  console.log("Id:" , id);
  Ad.remove({_id: id}, (err, currentAd) => {
    if (err) {
      next(err);
      return;
    }
    //Devuelve si ha sido eliminado
    res.json({ success: true, result: currentAd});
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

module.exports = router;