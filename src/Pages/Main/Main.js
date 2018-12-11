//client/components/Main/Main.js
import React, { Component } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";


class Main extends React.Component {
  constructor(props) {
    super(props);

    //btn click을 통한 페이지 이동 기능
    // this.btnJoin = this.btnJoin.bind(this);
    this.filterSelection = this.filterSelection.bind(this);
    this.w3AddClass = this.w3AddClass.bind(this);
    this.w3RemoveClass = this.w3RemoveClass.bind(this);
    this.fnSend = this.fnSend.bind(this);
  }

  // 로딩 스피너


  // 이메일 보내기
  fnSend(e) {
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let phone = this.refs.phone.value;
    let message = this.refs.message.value;

    // 입력해 주세요
    if (name.length == 0) {
      swal({ title: '이름을 입력해 주세요', icon: "info" })
      return false;
    }
    else if (email.length == 0) {
      swal({ title: '이메일을 입력해 주세요', icon: "info" })
      return false;
    }
    else if (phone.length == 0) {
      swal({ title: '전화번호를 입력해 주세요', icon: "info" })
      return false;
    }
    else if (message.length == 0) {
      swal({ title: '메세지를 입력해 주세요', icon: "info" })
      return false;
    }

    // 맞는 형식으로 입력해주세요
    var regEmail = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g
    if (!regEmail.test(email)) {
      swal({ title: '이메일을 알맞은 형식으로 입력해주세요', icon: "info" })
      return false;
    }
    var regNumber = /^[0-9]*$/;
    if (!regNumber.test(phone)) {
      swal({ title: '전화번호에 숫자만 입력해 주세요', icon: "info" })
      return false;
    }

    axios.post('/mail', {
      name: this.refs.name.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      message: this.refs.message.value
    }).then(function (data) {
      swal({ title: '이메일 전송에 성공 했습니다', icon: "success" })
        .then((value) => { location.reload(); })

    })
      .catch(function (error) {
        console.log(error);
      });
  }

  w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
  }


  w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }



  filterSelection(c) {
    console.log('in');
    var x, i;
    x = document.getElementsByClassName("filterDiv");

    if (c == "all") c = "";

    for (i = 0; i < x.length; i++) {

      // w3RemoveClass(x[i], "show");
      var element = x[i]
      var name = "show"
      var k, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");

      for (k = 0; k < arr2.length; k++) {
        while (arr1.indexOf(arr2[k]) > -1) {
          arr1.splice(arr1.indexOf(arr2[k]), 1);
        }
      }
      element.className = arr1.join(" ");


      if (x[i].className.indexOf(c) > -1) {
        //  w3AddClass(x[i], "show");
        var element = x[i]
        var name = "show"
        var p, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (p = 0; p < arr2.length; p++) {
          if (arr1.indexOf(arr2[p]) == -1) { element.className += " " + arr2[p]; }
        }
      }
    }
  }




  componentDidMount() {
    // 로딩 스피너
    axios.interceptors.request.use(function (config) {

      // spinning start to show
      // UPDATE: Add this code to show global loading indicator
      document.body.classList.add('loading-indicator');

      const token = window.localStorage.token;
      if (token) {
        config.headers.Authorization = `token ${token}`
      }
      return config
    }, function (error) {
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {

      // spinning hide
      // UPDATE: Add this code to hide global loading indicator
      document.body.classList.remove('loading-indicator');

      return response;
    }, function (error) {
      return Promise.reject(error);
    });
    //************************************************ */



    AOS.init({
      duration: 1000
    })

    function w3AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
      }
    }


    function w3RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }


    function filterSelection(c) {

      var x, i;
      x = document.getElementsByClassName("filterDiv");
      if (c == "all") c = "";
      for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
      }
    }

    filterSelection("all")





    // Add active class to the current button (highlight it)
    var btnContainer = document.getElementById("myBtnContainer");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }


  render() {





    <meta charSet="utf-8" />;
    require("es6-promise").polyfill();
    require("../../css/main.css");

    return (

      <div class="page-conts">
        <p id="about"></p>
        <div class="cate-cont about">
          <div class="row about-row">
            <div class="cont-title-about">ABOUT</div>
            <hr class="cont-about-hr" />
            <div class="col-md-6 about-cont about-cont-first">
              <div class="about-img" />
            </div>
            <div class="col-md-6 about-cont about-cont-second">
              <div class="cont-title-keyword">KEYWORD</div>
              <div class="about-slogan-second">
                미래를 예측하는 가장 확실한 방법은, 미래를 만드는 것이라고 생각합니다.
                <br />더 나은 미래를 만들어 나가는 개발자 정현석 입니다.
            </div>
              <ul class="about-ul">
                <li class="about-li" data-aos="zoom-in">DEVELOPER</li>
                <li class="about-li" data-aos="zoom-in">PROGRAMMING</li>
                <br />
                <li class="about-li" data-aos="zoom-in">1992</li>
                <li class="about-li" data-aos="zoom-in">MALE</li>
                <li class="about-li" data-aos="zoom-in">GIMPO</li>
                <br />
                <li class="about-li" data-aos="zoom-in">WEB SERVER</li>
                <li class="about-li" data-aos="zoom-in">JavaScript</li>
                <li class="about-li" data-aos="zoom-in">ETC</li>
              </ul>
            </div>
          </div>
        </div>
        <p id="work"></p>
        <div class="cate-cont works">
          <div class="cont-title">WORKS</div>
          <hr />
          <div id="myBtnContainer" ref="myBtnContainer" class="myBtnContainer" data-aos='fade-up' >
            <button class="btn active" onClick={() => this.filterSelection("all")}>All</button>
            <button class="btn" onClick={() => this.filterSelection("js")}> JavaScript</button>
            <button class="btn" onClick={() => this.filterSelection('html')}> Html</button>
            <button class="btn" onClick={() => this.filterSelection('css')}> Css</button>

          </div>
          <div class="container" data-aos='fade-up'>


            <div class="jumbotron con_head">
              <div class="row con_check">


                <div class="filterDiv js html css col-xs-6 col-sm-6 col-md-4 col-mgbtm">
                  <div >
                    <label class="whatever portfolil-img" for="r1">
                      <div class=" img-responsive width100" />
                      <img src="https://www.planwallpaper.com/static/images/518164-backgrounds.jpg" class=" img-responsive width100" />
                      <div class="row">
                        <div class="col-xs-offset-3 col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>


                <div class="filterDiv js  css col-xs-6 col-sm-6 col-md-4 col-mgbtm">
                  <div >
                    <label class="whatever portfolil-img" for="r1">
                      <img src="https://www.planwallpaper.com/static/images/518164-backgrounds.jpg" class=" img-responsive width100" />
                      <div class="row">
                        <div class="col-xs-offset-3 col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>


                <div class="filterDiv js html css col-xs-6 col-sm-6 col-md-4 col-mgbtm">
                  <div >
                    <label class="whatever portfolil-img" for="r1">
                      <img src="https://www.planwallpaper.com/static/images/518164-backgrounds.jpg" class=" img-responsive width100" />
                      <div class="row">
                        <div class="col-xs-offset-3 col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>


                <div class="filterDiv js  col-xs-6 col-sm-6 col-md-4 col-mgbtm">
                  <div>
                    <label class="whatever portfolil-img" for="r1">
                      <img src="https://www.planwallpaper.com/static/images/518164-backgrounds.jpg" class=" img-responsive width100" />
                      <div class="row">
                        <div class="col-xs-offset-3 col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="check_details">
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>
        <p id="contact"></p>
        <div class="cate-cont contact">
          <div class="cont-title">CONTACT</div>
          <hr />
          <div class="row about-row">
            <div class="col-md-6 about-cont  contact-cont-first">
              <div class="contact-info">
                <div class="myinfo" style={{ height: "50%" }}>
                  <div style={{ marginLeft: "15px", fontSize: "30px" }}>My Info</div>
                  <div class="info-text"><i class="fa fa-address-book-o"></i> NAME : JEONG HYUN SEOK</div>
                  <div class="info-text"><i class="fa fa-envelope"></i> EMAIL : jhs92043@gmail.com</div>
                  <div class="info-text"> <i class="fa fa-phone"></i>  PHONE : +82.10.4112.4823</div>
                  <div class="info-text"> <i class='fa fa-map-marker'></i> ADDRESS</div>
                </div>
                {/* 지도 */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12636.538516375305!2d126.620497!3d37.6460388!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa7cb429b244e1b6f!2zTEjtlZzqsIDrnozrp4jsnYQy64uo7KeA!5e0!3m2!1sko!2skr!4v1544424877948"
                  style={{ border: "0", width: "95%", height: "50%", frameborder: "0", textAlign: "center", margin: "2.5%", marginTop: "-10px" }} allowfullscreen></iframe>
              </div>
            </div>
            <div class="col-md-6 about-cont contact-cont-second">

              <div class="contact-mail">
                <div class="send-mail" style={{ height: "50%" }}>
                  <div style={{ marginLeft: "15px", fontSize: "30px" }}>SEND</div>
                  <input class="send-input" placeholder="NAME" ref="name"></input>
                  <input class="send-input" placeholder="E-MAIL" ref="email"></input>
                  <input class="send-input" placeholder="PHONE" ref="phone"></input>
                  <textarea class="send-input" style={{ background: "none", height: "70%" }} ref="message"></textarea>
                  <button class="send-button" onClick={this.fnSend} >SEND</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div id="footer">© JEONG HYUN SEOK 2018.</div>
      </div>
    );
  }
}

export default Main;