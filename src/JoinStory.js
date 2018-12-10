//client/components/join/join.js
import React, { Component } from "react";
import axios from 'axios';
// import  "../../../Styles/Join.css";


class Join extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
       litEmail: '자주 사용하는 이메일 주소를 입력해주세요.'
      , litPassword: '6자~16자 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요'
      , emailCheck: ''
      , pwCheck1: ''
      , pwCheck2: ''
      , litNickname: '실명 대신 사용할 닉네임을 입력해주세요.'
      , nicknameCheck: ''
      , litMemberName: ''
      , nameCheck: ''
      , litBirthday: ''
    }
    // onchange를 활용한 가입확인
    this.fnEmailCheck = this.fnEmailCheck.bind(this);
    this.fnPasswordCheck = this.fnPasswordCheck.bind(this);
    this.fnNicknameCheck = this.fnNicknameCheck.bind(this);
    this.fnNameCheck = this.fnNameCheck.bind(this);
    //btn click을 활용한 회원 가입 체크
    this.fnJoinCheck = this.fnJoinCheck.bind(this);
    //btn click을 활용한 회원 가입 저장
    this.fnJoin = this.fnJoin.bind(this);
  };
  
  
  //알맞은 이메일 확인 onchange
  fnEmailCheck(e) {
    let obj = this.refs.txtEmail.value;
    // console.log(obj);
    
    if (obj.length == 0) {
      this.setState({
        emailCheck: ' check-no',
        litEmail: <span class="msg-red" >이메일 주소를 입력해 주세요.</span>,
        hfEmailCheck: '0'
      })
      
      return false;
    }
    //틀린 형식으로 이메일 입력
    else if (obj.length > 0 && !/[a-z0-9-_]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i.test(obj)) {
      // console.log('wrong type email');
      this.setState({
        emailCheck: ' check-no',
        litEmail: <span class="msg-red">이메일을 정확히 입력하세요.</span>,
        
      })
      // (this.refs.hfEmailCheck).val('0');
      return false;
    }
    
    var self = this;
    axios.get('/member/api/joincheck?email=' + obj)
    .then(function (data) {
      // console.log(data.data.result);d
      
      if (data.data.result == "no") {
        self.setState({
          emailCheck: ' check-no',
          litEmail: <span class="msg-red">이미 사용중인 이메일 주소입니다.</span>,
          hfEmailCheck: '0'
        })
        // (self.refs.hfEmailCheck).val('0');
      }
      
      if (data.data.result == "ok") {
        self.setState({
          emailCheck: ' check-ok',
          litEmail: '사용가능한 이메일 주소입니다.',
          hfEmailCheck: '1'
        })
        //  (self.refs.hfEmailCheck).val('1');
        
        
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  //알맞은 닉네임 확인 onchange
  fnNicknameCheck(e) {
    let obj = this.refs.txtNickname.value;
    // console.log(obj);
    
    if (obj.length == 0) {
      this.setState({
        nicknameCheck: ' check-no',
        litNickname: <span class="msg-red">닉네임을 입력하세요.</span>,
        
      })
      return false;
    }
    
    let self = this;
    axios.get('/member/api/joincheck?nickname=' + obj)
    .then(function (data) {
      
      // console.log(data.data.result);
      if (data.data.result == "no") {
        self.setState({
          nicknameCheck: ' check-no',
          litNickname: <span class="msg-red">이미 사용중인  닉네임입니다.</span>,
          hfNicknameCheck: '0'
        })
        
      }
      
      if (data.data.result == "ok") {
        self.setState({
          nicknameCheck: ' check-ok',
          litNickname: '사용 가능한 닉네임입니다.',
          hfNicknameCheck: '1'
        })
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //알맞은 비밀번호 확인 onchange
  fnPasswordCheck(e) {
    let obj1 = this.refs.txtPassword.value;
    let obj2 = this.refs.txtPassword2.value;

    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/i.test(obj1)) {
      this.setState({
        pwCheck1: ' check-no',
        litPassword: <span class="msg-red">6자~16자 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요.</span>
      });
      return false;
    } else {
      this.setState({
        pwCheck1: ' check-ok',
        litPassword: <span>사용 가능한 비밀번호 입니다.</span>
      });
    }

    if (obj1.length > 0 && obj2.length > 0) {
      if (obj1 != obj2) {
        this.setState({
          pwCheck2: ' check-no',
          litPassword: <span class="msg-red">비밀번호가 일치하지 않습니다.</span>
        });
      } else {
        this.setState({
          pwCheck1: ' check-ok',
          pwCheck2: ' check-ok',
          litPassword: <span>비밀번호가 일치 합니다.</span>
        });
      }
    }
  }
  //이름 입력 onchange
  fnNameCheck(e) {
    let obj = this.refs.txtMemberName.value;
    
    if (obj.length == 0) {
      this.setState({
        nameCheck: ' check-no',
        litMemberName: <span class="msg-red">이름을 입력하세요.</span>
      })
      return false;
    }
    else {
      this.setState({
        nameCheck: ' check-ok',
        litMemberName: ''
      })
    }
    
  }
  //회원 가입 button 클릭
  fnJoinCheck(e) {
    //********************************
    // 이메일 입력
    //********************************
    let emailObj = this.refs.txtEmail.value;
    if (emailObj.length == 0) {
      this.setState({
        emailCheck: ' check-no',
        litEmail: <span class="msg-red">이메일 주소를 입력해 주세요.</span>
      })
      return false;
    }
    
    // 맞는 형식의 이메일 입력
    if (emailObj.length > 0 && !/[a-z0-9-_]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i.test(emailObj)) {
      console.log('wrong type email');
      this.setState({
        emailCheck: ' check-no',
        litEmail: <span class="msg-red">이메일을 정확히 입력하세요.</span>
      })
      return false;
    }
    
    let emailchkObj = this.refs.hfEmailCheck.value;
    if (emailchkObj == 0) {
      this.setState({
        emailCheck: ' check-no',
        litEmail: <span class="msg-red">이미 사용중인 이메일 주소입니다.</span>
      })
    }
    // **모든 이메일 확인 성공**
    this.setState({
      emailCheck: ' check-ok',
      litEmail: '사용가능한 이메일 주소입니다.'
    })
    
    //********************************
    //비밀번호 입력
    //********************************
    let pwObj = this.refs.txtPassword.value;
    if (pwObj.length == 0) {
      this.setState({
        pwCheck1: ' check-no',
        litPassword: <span class="msg-red">비밀번호를 입력하세요.</span>
      })
      return false;
    }
    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/i.test(pwObj)) {
      this.setState({
        pwCheck1: ' check-no',
        litPassword: <span class="msg-red">6자~16자 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요.</span>
      })
      return false;
    }
    
    let pwtchkObj = this.refs.txtPassword2.value;
    if (pwtchkObj.length == 0) {
      this.setState({
        pwCheck2: ' check-no',
        litEmail: <span class="msg-red">비밀번호 확인을 입력하세요.</span>
      })
      return false;
    }
    
    if (pwObj != pwtchkObj) {
      this.setState({
        pwCheck1: ' check-no',
        pwCheck2: ' check-no',
        litPassword: <span class="msg-red">비밀번호가 일치하지 않습니다.</span>
      })
      return false;
    }
    // **모든 비밀번호 확인 성공**
    this.setState({
      pwCheck1: ' check-ok',
      pwCheck2: ' check-ok',
      litPassword: ''
      
    })
    //********************************
    // 이름 입력하기
    //********************************
    let nameObj = this.refs.txtMemberName.value;
    if (nameObj.length == 0) {
      
      this.setState({
        nameCheck: ' check-no',
        litMemberName: <span class="msg-red">이름을 입력하세요.</span>
      })
      return false;
    }
    this.setState({
      nameCheck: ' check-ok',
      litMemberName: ''
    })
    //********************************
    //닉네임 입력하기
    //********************************
    let nicknameObj = this.refs.txtNickname.value;
    if (nicknameObj.length == 0) {
      this.setState({
        nicknameCheck: ' check-no',
        litNickname: <span class="msg-red">닉네임을 입력하세요.</span>
      })
      return false;
    }
    
    console.log('---------------------------');
    console.log(this.refs.hfNicknameCheck.value);
    console.log('---------------------------');
    
    let nicknamechkObj = this.refs.hfNicknameCheck.value;
    if (nicknamechkObj == 0) {
      this.setState({
        nicknameCheck: ' check-no',
        litNickname: <span class="msg-red">이미 사용중인 닉네임입니다.</span>
      })
    }
    // **모든 닉네임 확인 성공**
    this.setState({
      nicknameCheck: ' check-ok',
      litNickname: '사용가능한 닉네임입니다.'
    })
    
    //********************************
    //생년월일 입력
    //********************************
    let birthYear = this.refs.txtBirthYear.value;
    let birthMonth = this.refs.txtBirthMonth.value;
    let birthDay = this.refs.txtBirthDay.value;
 
    if (birthYear > 0 && birthMonth > 0 && birthDay > 0) {
        

      try {
        if (birthMonth.length < 2) {
          // if (birthMonth < 10) 
          // { birthMonth = '0' + birthMonth };
           birthMonth = '0' + birthMonth ;
        }
        if (birthDay.length < 2) {
          // if (birthDay < 10) 
          // { birthDay = '0' + birthDay };
          { birthDay = '0' + birthDay };
        }
        let birthStr = birthYear + '-' + birthMonth + '-' + birthDay;
        let birth = new Date(birthStr);

        console.log(birthStr);
        console.log(birth);

        if (birth == 'Invalid Date') {
          this.setState({
            litBirthday: <span class="msg-red">생년월일을 다시 확인해주세요.</span>
          })
          return false;
        }
      } catch (e) {
        this.setState({
          litBirthday: <span class="msg-red">생년월일을 다시 확인해주세요.</span>
        })
        return false;
      }
      this.setState({
        litBirthday: ''
      })
    }
    
    else {
      this.setState({
        litBirthday: <span class="msg-red">생년월일을 다시 확인해주세요.</span>
      })
      return false;
    }
    return this.fnJoin();
    
    
  }
  //************************************
  //모든 회원가입 조건이 성공 했을 때
  //************************************
  fnJoin(e) {
    // 날짜 형식 정리
    
    let birthMonth = this.refs.txtBirthMonth.value;
    let birthDay = this.refs.txtBirthDay.value;
    
    if(birthMonth.length <2){
      { birthMonth = '0' + birthMonth };
    }
    
    if(birthDay.length<2){
      { birthDay = '0' + birthDay };
    }
    
    axios.post('/member/join', {
      email : this.refs.txtEmail.value,
      name : this.refs.txtMemberName.value,
      nickname : this.refs.txtNickname.value,
      birthYear : this.refs.txtBirthYear.value,
      birthMonth : birthMonth ,
      birthDay :  birthDay,
      password : this.refs.txtPassword.value,
      storymaker : 'storymaker'
    })
    .then(function (data) {
      console.log(data);
      alert('가입 성공');
      location.href ='http://storymaker.vrware.us/'
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {

    require('es6-promise').polyfill();
    require( "../../../Styles/Join.css");
    return (
      <div className="join_wrap_div">
        {/* META */}
        <meta charSet="utf-8" />
        <meta name="viewport" />
        {/* Optimize mobile viewport */}
        <title>회원 가입3</title>
        {/* webfont */}
        <link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/jejugothic.css" />
        {/* style*/}
        {/* {<script rel="stylesheet" href="../../../Styles/Join.css" /> } */}
        <style dangerouslySetInnerHTML={{ __html: "\n    body {\n        background: #ececec\n    }\n" }} />
        <div className="contents">
          {/* Header */}
          <section>
            <div className="containerjoin">
              <div className="join_div">
                <a href="/">
                  <img id="schoolmoblogo" src="../../Images/storylogo.png" />
                </a>
                <hr />
                <div className="term_title">
                  <div className="tit_join">가입 정보 입력</div>
                  <div className="txt_desc">
                    로그인 정보 및 가입 정보를 입력하세요.
                      </div>
                </div>
              </div>
              <div id="content_pnlJoin" className="contents">
                <div className="join-box">
                  <div className="title">기본정보</div>
                  {/* 이메일 입력*/}
                  <input
                    type="email"
                    ref="txtEmail"
                    className={"txtEmail" + this.state.emailCheck}
                    onChange={this.fnEmailCheck}
                    placeholder="아이디(이메일)" />

                  {/* 이메일 메세지 */}
                  <div id="litEmail"
                    ref="litEmail"
                    className="litEmail"
                    style={{fontSize: '0.7em'}}
                    >
                    {this.state.litEmail}
                   
                  </div>
                  <input type="hidden" name="ctl00$content$hfEmailCheck" id="hfEmailCheck" ref="hfEmailCheck" defaultValue={0} value={this.state.hfEmailCheck} />


                  {/* 비밀번호 입력*/}
                  <input
                    name="ctl00$content$txtPassword"
                    type="password"
                    maxLength={16}
                    ref="txtPassword"
                    className={"txtPassword" + this.state.pwCheck1}
                    onChange={this.fnPasswordCheck}
                    placeholder="비밀번호" />

                  <input
                    name="ctl00$content$txtPassword2"
                    type="password"
                    maxLength={16}
                    ref="txtPassword2"
                    className={"txtPassword" + this.state.pwCheck2}
                    onChange={this.fnPasswordCheck}
                    placeholder="비밀번호 확인" />

                  {/* 비밀번호 메세지 */}
                  <div id="litPassword"
                    ref="litPassword"
                    className="litPassword"
                    style={{fontSize: '0.7em'}}
                    >
                    {this.state.litPassword}
                  </div>


                </div>
                <div className="join-box">
                  <div className="title">개인정보</div>

                  {/* 사용자 이름 입력 */}
                  <input
                    name="ctl00$content$txtMemberName"
                    type="text"
                    maxLength={20}
                    id="txtMemberName"
                    ref="txtMemberName"
                    className={"txtMemberName" + this.state.nameCheck}
                    onChange={this.fnNameCheck}
                    placeholder="이름" />

                  {/* 사용자 이름 메시지 */}
                  <div id="litMemberName" ref="litMemberName" className="litMemberName" >
                    {this.state.litMemberName}
                  </div>

                  {/* 닉네임 입력*/}
                  <input
                    type="text"
                    maxLength={20}
                    ref="txtNickname"
                    className={"txtNickname" + this.state.nicknameCheck}
                    onChange={this.fnNicknameCheck}
                    placeholder="닉네임" />

                  {/* 닉네임 메시지*/}
                  <div
                    id="litNickname"
                    ref="litNickname"
                    className="litNickname"
                    style={{fontSize: '0.7em'}}
                    >
                    {this.state.litNickname}
                   
                  </div>

                  <input type="hidden" name="ctl00$content$hfNicknameCheck" id="hfNicknameCheck" ref="hfNicknameCheck" defaultValue={0} value={this.state.hfNicknameCheck} />

                  <ul className="birth" style={{ height: 45 }}>
                    <li id="birthdiv">
                      <div>생일</div>
                    </li>

                    {/* 생년월일 입력*/}
                    <li style={{ width: '40%', marginRight: '-5px' }}>
                      <input
                        name="ctl00$content$txtBirthYear"
                        type="text"
                        maxLength={4}
                        id="txtBirthYear"
                        ref="txtBirthYear"
                        className="txtBirthYear"
                        placeholder="년(4자)"
                        onkeypress="fnInputNumCheck(event);"
                        style={{ imeMode: 'disabled' }} />
                    </li>
                    <li>
                      <input
                        name="ctl00$content$txtBirthMonth"
                        type="text"
                        maxLength={2}
                        id="txtBirthMonth"
                        ref="txtBirthMonth"
                        className="txtBirthMonth"
                        placeholder="월"
                        onkeypress="fnInputNumCheck(event);"
                        style={{ imeMode: 'disabled' }} />
                    </li>
                    <li>
                      <input
                        name="ctl00$content$txtBirthDay"
                        type="text"
                        maxLength={2}
                        id="txtBirthDay"
                        ref="txtBirthDay"
                        className="txtBirthDay"
                        placeholder="일"
                        onkeypress="fnInputNumCheck(event);"
                        style={{ imeMode: 'disabled' }} />
                    </li>
                  </ul>
                  {/* 생년월일 메세지*/}
                  <div id="litBirthday" ref="litBirthday" className="litBirthday" >
                    {this.state.litBirthday}
                  </div>
                </div>

                <div id="content_UpdatePanel2" className="text-center">
                  <input
                    type="submit"
                    name="ctl00$content$btnJoin"
                    defaultValue="가입하기"
                    onClick={this.fnJoinCheck}
                    id="content_btnJoin"
                    className="btn btn-join" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}


export default Join;
