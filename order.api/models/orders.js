var mongoose = require('mongoose'),
    Schema = mongoose.Schema,    
    bcrypt = require('bcryptjs');

var orderSchema = new Schema({
  id          :   {type: String, required: 'OrderId invalid'},  
  customerId  :   {type: String},
  customerName:   {type: String},
  stocks: [{
  stockId     :   {type: String},
  stockName   :   {type: String},
  quantity    :   {type: Number},
  price       :   {type: Number}
  }]
});

module.exports = mongoose.model('orders', orderSchema);