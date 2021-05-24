//server/routes/routes.js
const express = require('express');
var app = express();
app.use(express.json())
var router = express.Router();


router.get("/", function (req, res) {
    console.log(req.cookies.jeong_sid)
    res.render("index");
});

//이메일 보내기
router.get("/mail", (req,res)=>{
// 이메일
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jhs92043@gmail.com',
    pass: 'rkdmf4823?'
  }
});
    
  var mailOptions = {
    from: req.query.email,
      to: 'jhs92043@gmail.com',
    subject: 'MAIL FROM WHALE TEACHER',
    html:  '<h2>EMAIL: '+req.query.email+'</h2>'
          +'<h2>NAME: '+req.query.name+'</h2>'
          +'<h2>PHONE: '+req.query.phone+'</h2>'
          +'<h2>MESSAGE: '+req.query.message+'</h2>'
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