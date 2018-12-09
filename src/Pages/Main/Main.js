//client/components/Main/Main.js
import React, { Component } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
// import axios from "axios";
// import Pagination from "react-js-pagination";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userId: ""
    };
    //btn click을 통한 페이지 이동 기능
    // this.btnJoin = this.btnJoin.bind(this);
    this.filterSelection = this.filterSelection.bind(this);
    this.w3AddClass = this.w3AddClass.bind(this);
    this.w3RemoveClass = this.w3RemoveClass.bind(this);

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
    const { options } = this.state;

    <meta charSet="utf-8" />;
    require("es6-promise").polyfill();
    require("../../css/main.css");

    return (

      <div class="page-conts">

        <div class="about">
          <div class="row about-row">
            <div class="col-md-6 about-cont about-cont-first">
              <div class="about-img" />
            </div>
            <div class="col-md-6 about-cont about-cont-second">
              <div class="cont-title-about">ABOUT</div>
              <hr class="cont-about-hr" />
              <div class="about-slogan-second">
                미래를 예측하는 가장 확실한 방법은, 미래를 만드는 것이라고 생각합니다.
                <br />더 나은 미래를 만들어 나가는 개발자 정현석 입니다.
            </div>
              <ul class="about-ul">
                <li class="about-li"  data-aos="zoom-in">DEVELOPER</li>
                <li class="about-li"  data-aos="zoom-in">PROGRAMMING</li>
                <br />
                <li class="about-li"  data-aos="zoom-in">1992</li>
                <li class="about-li"  data-aos="zoom-in">MALE</li>
                <li class="about-li"  data-aos="zoom-in">GIMPO</li>
                <br />
                <li class="about-li"  data-aos="zoom-in">WEB SERVER</li>
                <li class="about-li"  data-aos="zoom-in">JavaScript</li>
                <li class="about-li"  data-aos="zoom-in">ETC</li>
              </ul>

            </div>
          </div>
        </div>
   
        <div class="works">
          <div class="cont-title">WORKS</div>
          <hr />

          <div id="myBtnContainer" ref="myBtnContainer" class="myBtnContainer" data-aos='fade-up' >
            <button class="btn active" onCdivck={() => this.filterSelection("all")}>All</button>
            <button class="btn" onClick={() => this.filterSelection("js")}> JavaScript</button>
            <button class="btn" onClick={() => this.filterSelection('html')}> Html</button>
            <button class="btn" onClick={() => this.filterSelection('css')}> Css</button>

          </div>

          <div class="container" data-aos='fade-up'>
        

            <div class="jumbotron cat_head">
              <div class="row cat_check">


                <div class="filterDiv js html css col-xs-6 col-sm-6 col-md-4 col-mgbtm">
                  <div >
                    <label class="whatever" for="r1">
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
                    <label class="whatever" for="r1">
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
                    <label class="whatever" for="r1">
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
                    <label class="whatever" for="r1">
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

        <div class="contact">
          <div class="cont-title">CONTACT</div>
          <hr />
        </div>
      </div>
    );
  }
}

export default Main;