// models/member.js

var mongoose = require('mongoose');
//var memberdb = mongoose.createConnection("mongodb://13.125.140.13:27017/vrware_member");
// var memberdb = mongoose.createConnection("mongodb://member:globep0int@13.125.140.13:25015/vrware_member",{ dbName: 'vrware_member'});

var Schema = mongoose.Schema;

console.log('pass member schema');
var memberSchema = new Schema({
    id : String,
    email: String,
    password: String,
    memberName: String,
    nickname: String,
    birthday: String,
    memberState: String,
    memberType: String,
    group:String,
    joinDate: String,
    storymaker : String
});
module.exports = memberdb.model('member', memberSchema);


