//client/components/Main/Main.js
import React, { Component } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

axios.defaults.headers.post = null;
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
      swal({ title: "이름을 입력해 주세요", icon: "info" });
      return false;
    } else if (email.length == 0) {
      swal({ title: "이메일을 입력해 주세요", icon: "info" });
      return false;
    } else if (phone.length == 0) {
      swal({ title: "전화번호를 입력해 주세요", icon: "info" });
      return false;
    } else if (message.length == 0) {
      swal({ title: "메세지를 입력해 주세요", icon: "info" });
      return false;
    }

    // 맞는 형식으로 입력해주세요
    var regEmail =
      /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g;
    if (!regEmail.test(email)) {
      swal({ title: "이메일을 알맞은 형식으로 입력해주세요", icon: "info" });
      return false;
    }
    var regNumber = /^[0-9]*$/;
    if (!regNumber.test(phone)) {
      swal({ title: "전화번호에 숫자만 입력해 주세요", icon: "info" });
      return false;
    }

    axios
      .get(
        `/mail?name=` +
          name +
          "&email=" +
          email +
          "&phone=" +
          phone +
          "&message=" +
          message
      )
      .then((res) => {
        swal({ title: "이메일 전송에 성공 했습니다", icon: "success" }).then(
          (value) => {
            location.reload();
          }
        );
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
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
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
    var x, i;
    x = document.getElementsByClassName("filterDiv");

    if (c == "all") c = "";

    for (i = 0; i < x.length; i++) {
      // w3RemoveClass(x[i], "show");
      var element = x[i];
      var name = "show";
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
        var element = x[i];
        var name = "show";
        var p, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (p = 0; p < arr2.length; p++) {
          if (arr1.indexOf(arr2[p]) == -1) {
            element.className += " " + arr2[p];
          }
        }
      }
    }
  }

  componentDidMount() {
    // 로딩 스피너
    axios.interceptors.request.use(
      function (config) {
        // spinning start to show
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add("loading-indicator");

        const token = window.localStorage.token;
        if (token) {
          config.headers.Authorization = `token ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        // spinning hide
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove("loading-indicator");

        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    //************************************************ */

    AOS.init({
      duration: 1000,
    });

    function w3AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
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

    filterSelection("all");

    // Add active className to the current button (highlight it)
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
      <div className="page-conts">
        <p id="about"></p>
        <div className="cate-cont about">
          <div className="row about-row">
            <div className="cont-title-about">ABOUT</div>
            <hr className="cont-about-hr" />
            <div className="col-md-6 about-cont about-cont-first">
              <div className="about-img" />
            </div>
            <div className="col-md-6 about-cont about-cont-second">
              <div className="cont-title-keyword">KEYWORD</div>
              <div className="about-slogan-second">
                미래를 예측하는 가장 확실한 방법은, 미래를 만드는 것이라고
                생각합니다.
                <br />더 나은 미래를 만들어 나가는 개발자 정현석 입니다.
                <br />
              </div>
              <ul className="about-ul">
                <li className="about-li" data-aos="zoom-in">
                  Jeong
                </li>
                <li className="about-li" data-aos="zoom-in">
                  FrontEnd
                </li>
                <li className="about-li" data-aos="zoom-in">
                  Developer
                </li>
                <br />
                <li className="about-li" data-aos="zoom-in">
                  JavaScript
                </li>
                <li className="about-li" data-aos="zoom-in">
                  Vue
                </li>
                <li className="about-li" data-aos="zoom-in">
                  Nuxt
                </li>
                <br />
                <li className="about-li" data-aos="zoom-in">
                  Publishing
                </li>
                <li className="about-li" data-aos="zoom-in">
                  AWS
                </li>
                <li className="about-li" data-aos="zoom-in">
                  Git
                </li>
                <br />
              </ul>
              <div className="about-slogan-second">
                <a
                  className="about-slogan-third-a"
                  target="_blank"
                  href="https://github.com/jeonghyunseok"
                >
                  <i className="fab fa-github" /> GITHUB :
                  https://github.com/jeonghyunseok
                </a>
                <br />
                <a
                  className="about-slogan-third-a"
                  target="_blank"
                  href="https://jeong92.tistory.com"
                >
                  <i className="fa fa-blog" /> BLOG :
                  https://jeong92.tistory.com
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </div>
        </div>
        <p id="career"></p>
        <div className="cate-cont careers">
          <div className="cont-title">CAREERS</div>
          <hr />
          <br />
          <div className="container">
            <div className="career-content">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="career-image">
                  <a target="_blank" href="https://user.dry.co.kr">
                    <img
                      className="img-responsive"
                      src="../images/ondelab.png"
                      alt=""
                      width="10rem"
                    />
                  </a>
                </div>
                <div className="career-cont">
                  <div className="career-text-title">온디맨드랩 </div>
                  <div className="career-text-cont">
                    매일새옷 개발팀 프론트엔드 개발
                    <br />
                    2021.10-2022.08 (10M)
                    <br />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="career-image">
                  <a target="_blank" href="https://www.catch.co.kr/">
                    <img
                      className="img-responsive"
                      src="../images/jinhak.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="career-cont">
                  <div className="career-text-title">진학사 </div>
                  <div className="career-text-cont">
                    CATCH 개발팀 PD
                    <br />
                    2019.08-2021.05 (1Y 11M)
                    <br />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                <div className="career-image">
                  <a target="_blank" href="https://my.vrware.us/">
                    <img
                      className="img-responsive"
                      src="../images/globepoint.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="career-cont">
                  <div className="career-text-title">글로브포인트</div>
                  <div className="career-text-cont">
                    R&D 개발사업부
                    <br />
                    2018.11-2019.11 (1Y 1M)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p id="work"></p>
        <div className="cate-cont works">
          <div className="cont-title">WORKS</div>
          <hr />
          <div
            id="myBtnContainer"
            ref="myBtnContainer"
            className="myBtnContainer"
            data-aos="fade-up"
          >
            <button
              className="btn active"
              onClick={() => this.filterSelection("all")}
            >
              All
            </button>
            {/* <button className="btn" onClick={() => this.filterSelection('my')}> MY PROJECT</button> */}
            <button className="btn" onClick={() => this.filterSelection("vue")}>
              vue.js
            </button>
            <button
              className="btn"
              onClick={() => this.filterSelection("nuxt")}
            >
              nuxt.js
            </button>
            <button
              className="btn"
              onClick={() => this.filterSelection("flutter")}
            >
              flutter app
            </button>
            <button
              className="btn"
              onClick={() => this.filterSelection("node")}
            >
              node.js
            </button>
            <button className="btn" onClick={() => this.filterSelection("asp")}>
              ASP.NET
            </button>
            <button className="btn" onClick={() => this.filterSelection("js")}>
              JavaScript
            </button>
          </div>
          <div className="container" data-aos="fade-up">
            <div className="filterDiv vue nuxt flutter js port-cont-div col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img
                  className="img-responsive"
                  src="../images/dry.png"
                  alt=""
                />
                <div className="overlay">
                  <h2 className="overlay-title">새탁 O2O 웹앱 매일새옷</h2>
                  <h2 className="overlay-skills">
                    Vue.js / Nuxt.js / Flutter / WebApp{" "}
                  </h2>
                  <p>
                    <a
                      className="overlay-view"
                      target="_blank"
                      href="http://user.dry.co.kr"
                    >
                      view more >{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="filterDiv vue nuxt node js port-cont-div col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img
                  className="img-responsive"
                  src="../images/catch.png"
                  alt=""
                />
                <div className="overlay">
                  <h2 className="overlay-title">CATCH 채용 사이트</h2>
                  <h2 className="overlay-skills">
                    Vue.js / Nuxt.js / Node.js / MSSQL / WebApp{" "}
                  </h2>
                  <p>
                    <a
                      className="overlay-view"
                      target="_blank"
                      href="http://www.catch.co.kr/"
                    >
                      view more >{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="filterDiv vue nuxt node js port-cont-div col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img
                  className="img-responsive"
                  src="../images/catchapply.png"
                  alt=""
                />
                <div className="overlay">
                  <h2 className="overlay-title">CATCHAPPLY 기업채용</h2>
                  <h2 className="overlay-skills">
                    Vue.js / Nuxt.js / Node.js / PostgerSQL / WebApp{" "}
                  </h2>
                  <p>
                    <a
                      className="overlay-view"
                      target="_blank"
                      href="http://www.catchapply.co.kr/"
                    >
                      view more >{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="filterDiv asp js port-cont-div col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img
                  className="img-responsive"
                  src="../images/arivri.png"
                  alt=""
                />
                <div className="overlay">
                  <h2 className="overlay-title">VRWARE 소개 웹</h2>
                  <h2 className="overlay-skills">
                    {" "}
                    ASP.NET / HTML / CSS / JS / Responsive / PLANNING
                  </h2>
                  <p>
                    <a
                      className="overlay-view"
                      target="_blank"
                      href="http://vrware.us/"
                    >
                      view more >{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p id="contact"></p>
        <div className="cate-cont contact">
          <div className="cont-title">CONTACT</div>
          <hr />
          <div className="row about-row">
            <div className="col-md-6 about-cont  contact-cont-first">
              <div className="contact-info">
                <div className="myinfo" style={{ height: "50%" }}>
                  <div style={{ marginLeft: "15px", fontSize: "30px" }}>
                    My Info
                  </div>
                  <div className="info-text">
                    <i className="fa fa-address-book-o"></i> NAME : JEONG HYUN
                    SEOK
                  </div>
                  <div className="info-text">
                    <i className="fa fa-envelope"></i> EMAIL :
                    jhs92043@gmail.com
                  </div>
                  <div className="info-text">
                    {" "}
                    <i className="fa fa-phone"></i> PHONE : +82.10.4112.4823
                  </div>
                  <div className="info-text">
                    {" "}
                    <i className="fa fa-map-marker"></i> ADDRESS
                  </div>
                </div>
                {/* 지도 */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.551851821967!2d126.96610935135313!3d37.471301779716654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca03c4569a527%3A0x3d8d40af2563cbf9!2z7ISc7Jq47Yq567OE7IucIOq0gOyVheq1rCDsnbjtl4wxNeq4uCAxOC00!5e0!3m2!1sko!2skr!4v1660709541590!5m2!1sko!2skr"
                  width="600"
                  height="450"
                  style="border:0;"
                  allowFullScreen=""
                  loading="lazy"
                  style={{
                    border: "0",
                    width: "95%",
                    height: "50%",
                    frameborder: "0",
                    textAlign: "center",
                    margin: "2.5%",
                    marginTop: "-10px",
                  }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-md-6 about-cont contact-cont-second">
              <div className="contact-mail">
                <div className="send-mail" style={{ height: "50%" }}>
                  <div style={{ marginLeft: "15px", fontSize: "30px" }}>
                    SEND
                  </div>
                  <input
                    className="send-input"
                    placeholder="NAME"
                    ref="name"
                  ></input>
                  <input
                    className="send-input"
                    placeholder="E-MAIL"
                    ref="email"
                  ></input>
                  <input
                    className="send-input"
                    placeholder="PHONE"
                    ref="phone"
                  ></input>
                  <textarea
                    className="send-input"
                    style={{ background: "none", height: "70%" }}
                    ref="message"
                  ></textarea>
                  <button className="send-button" onClick={this.fnSend}>
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer">© JEONG HYUN SEOK {new Date().getFullYear()}.</div>
      </div>
    );
  }
}
export default Main;
