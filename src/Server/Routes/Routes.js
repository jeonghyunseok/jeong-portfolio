//server/routes/routes.js
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
// 이메일
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jhs92043@gmail.com',
    pass: 'rkdmf4823!'
  }
});

router.use(bodyParser.urlencoded({ extended: false }));


// DEFINE MODEL
// var Member = require("../../Models/Member");
// var Session = require("../../Models/Session");

//세션 환경 세팅
// var session = require("express-session");

//몽구스 환경 세팅
// var MongoStore = require("connect-mongo")(session);
// mongoose = require("mongoose");

// router.use(
//     session({
//         saveUninitialized: false,
//         resave: true,
//         key: "jeong_sid",
//         secret: "jeongsecretkey!@",
//         cookie: {
//             maxAge: 60000 * 60 * 24 //쿠키 유효시간 1분 곱하기 60 은 1시간 곱하기 24는 하루
//         },
//         store: new MongoStore({
//             url: "mongodb://member:globep0int@13.125.140.13:25015/vrware_member",
//             clear_interval: 1
//         })
//     })
// );

//접속 아이피 확인
// var requestIp = require('request-ip');
// var ip = require("ip");
// //접속 기기 확인
// var device = require('express-device');
// router.use(device.capture());


//************************************************
// <summary>
// 세션 아이디 GET (jeong)
// date : 2018.10.19
// </summary>
//************************************************

// router.get("/session", function (req, res) {
//     console.log('세션')
//     console.log(req.cookies.jeong_sid)
//     if (req.cookies.jeong_sid != undefined) {
//         Session.find({ "session": new RegExp(req.cookies.jeong_sid.split('s:')[1].split('.')[0]) }, function (err, loginSess) {
//             if (err) {
//                 return res.status(500).json({ error: err });
//             }
//             return res.status(200).json({ sessionID: req.cookies.jeong_sid.split('s:')[1].split('.')[0], session: loginSess });
//         })
//     } else {
//         return res.status(200).json({ sessionID: undefined, session: undefined });
//     }

// });



//************************************************
// <summary>
// 화면 경로 (jeong)
// date : 2018.12.03
// </summary>
//************************************************
//메인화면 경로
router.get("/", function (req, res) {
    console.log(req.cookies.jeong_sid)
    res.render("index");
});
//Vanilla Sample 경로
// router.get("/vanilla", function (req, res) {
//     res.render("index");
// });


//이메일 보내기
router.post("/mail",function(req,res){
 
    // var nodemailer = require('nodemailer');

    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'jhs92043@gmail.com',
    //     pass: 'rkdmf4823!'
    //   }
    // });
    
    var mailOptions = {
      from: req.body.email,
      to: 'jhs92043@gmail.com',
      subject: 'MAIL FROM WHALE TEACHER',
      html:  '<h2>EMAIL:'+req.body.email+'</h2>'
            +'<h2>NAME:'+req.body.name+'</h2>'
            +'<h2>PHONE:'+req.body.phone+'</h2>'
            +'<h2>MESSAGE:'+req.body.message+'</h2>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ "result": "ok"});
      }
    });

})

module.exports = router;