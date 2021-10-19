var Orders = require('../models/orders.js');

exports.list = function (req, res) {
    Orders.find({}).then(function (result) {
        res.json(result);
    });
};

exports.get = function (req, res) {
    Orders.findOne({id: req.params.id}).exec(function (err, doc) {
            if (err || doc === null) {
                res.status(404).json({ error: 'Order Not Found!' });
            } else {
                res.json(doc);
            }
        });
};

exports.create = function(req, res){
    Orders.create(req.body).then(function(result){
        res.json(result);
    });
}