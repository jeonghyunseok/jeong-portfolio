// models/session.js

var mongoose = require('mongoose');
//var memberdb = mongoose.createConnection("mongodb://13.125.140.13:27017/vrware_member");
// var memberdb = mongoose.createConnection("mongodb://member:globep0int@13.125.140.13:25015/admin",{ dbName: 'vrware_member'});
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
   _id: String,
   session: String,
   expires : Date,
   email : String
});
module.exports = memberdb.model('session', sessionSchema);


