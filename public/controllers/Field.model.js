var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FieldSchema = new Schema({
    _id: ObjectId,
    fieldName: String,
    perMin: Number,
    stock:Number,
    level: Number
},
/*look for the this exact collection*/
{collection: 'game'});

module.exports = mongoose.model('game', FieldSchema);