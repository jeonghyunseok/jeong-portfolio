//client/components/Main/Main.js
import React, { Component } from "react";
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


    //드롭다운
    // this.dropdownChange = this.dropdownChange.bind(this);
  }

  componentDidMount() {

  }

    
  render() {
    const { options } = this.state;

    <meta charSet="utf-8" />;
    require("es6-promise").polyfill();

    return (
      <div class="page-conts">
        <div> works</div>
        <a href="http://whaleteacher.com:3000/">work1</a>

      </div>
    );
  }
}

export default Main;