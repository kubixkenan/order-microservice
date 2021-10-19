var config = require('./config');
var jwt = require('jwt-simple');
var Order = require('./controllers/order.js');

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }
  next();
};

module.exports = function (app) {
  app.get('/order/list', isAuth, Order.list);
  app.post('/order/create', isAuth, Order.create);
  app.get('/order/get/:id', isAuth, Order.get);
};