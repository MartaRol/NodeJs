"use strict";

const basicAuth = require('basic-auth');

module.exports = (req, res, next) => {
  const user = basicAuth(req);
  
  // buscar en la base de datos el usuario user.name
  // y compobar la password

  if (!user || user.name !== 'admin' || user.pass !== '123') {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.send(401);
    return;
  }
  next();
};