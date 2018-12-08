//------------------------------------------------------------------------------------
// 항상 실행 스크립트
//------------------------------------------------------------------------------------
var pageConts = $('.page-conts');
var contsHeight = 0;

function fnContentsHeight()
{
    var clientHeight = $(window).height() - 158;
    if (clientHeight > contsHeight)
    {
        pageConts.css('height', clientHeight);
    }
}

$(document).ready(function() {
    contsHeight = pageConts.height();
    fnContentsHeight();
    setTimeout(function()
    { 
        contsHeight = pageConts.height();
        fnContentsHeight(); 
    }, 1000);

    var skyDownload = $('.sky-download');
    $(window).resize(function() {
        fnContentsHeight();
    });
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        skyDownload.css('top', scrollTop + 152);
    });
});

//------------------------------------------------------------------------------------
// jquery-confirm 간단히 사용하기
//------------------------------------------------------------------------------------

function fnAlert(title, content, confirm_callback)
{
    if (title.length == 0) title = false;

    $.alert({
        icon:'glyphicon glyphicon-warning-sign',
        title:title,
        content:content,
        boxWidth: '500px',
        useBootstrap: false,
        animation:'scaleY',
        closeAnimation:'scaleX',
        animationBounce: 2,
        buttons:{
            confirm: {
                text: '&nbsp;OK&nbsp;',
                btnClass: 'btn-blue',
                action: function () { 
                    if (confirm_callback != null) { 
                        if((typeof confirm_callback) == 'function')
                        {
                            confirm_callback();
                        }
                        else
                        {
                            setTimeout(function(){ confirm_callback.focus(); }, 500);
                        }
                    }
                }
            }
        }
    });
}

function fnConfirm(title, content, confirm_callback, cancel_callback)
{
    if (title.length == 0) title = false;

    $.confirm({
        icon:'glyphicon glyphicon-question-sign',
        title:title,
        content:content,
        boxWidth: '500px',
        useBootstrap: false,
        animation:'scaleY',
        closeAnimation:'scaleX',
        animationBounce: 2,
        buttons:{
            confirm: {
                text: '&nbsp;OK&nbsp;',
                btnClass: 'btn-blue',
                action: function () { if (confirm_callback != null) { confirm_callback(); } }
            },
            cancel: {
                text: 'CANCEL',
                btnClass: 'btn-default',
                action: function () { if (cancel_callback != null) { cancel_callback(); } }
            }
        }
    });
}

//------------------------------------------------------------------------------------
// 브라우저 구별
//------------------------------------------------------------------------------------
var Browser = 
{
    browserType : { Etc : 0, InternetExplorer : 1, Chrome : 2, Firefox : 3, Safari : 4, Opera : 5, Edge : 6 },
    agent : 0,
    version : 0,
    name: 'Etc',

    deviceType : { Etc : 0, PC : 1, Mobile : 2 },
    device: 0,

    osType : { Etc : 0, Windows : 1, Macintosh : 2, Linux : 3, Android : 11, iOS : 12, WindowsPhone : 13, EtcMobile : 19 },
    os : 0,
    os_version: 0,
    os_detail_version : 0
};
var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf(' msie') > -1) 
{
    Browser.agent = Browser.browserType.InternetExplorer;
    Browser.version = parseFloat(agent.match(/ msie\ (\d+\.\d+)/)[1]);
    Browser.name = 'InternetExplorer';
}
else if (agent.indexOf(' trident/') > -1) 
{
    Browser.agent = Browser.browserType.InternetExplorer;
    if (agent.match(/ rv\:(\d+\.\d+)/) != null)
	{
    	Browser.version = parseFloat(agent.match(/ rv\:(\d+\.\d+)/)[1]);
	}
    else if (agent.match(/ rv\:(\d+)/) != null)
	{
    	Browser.version = parseFloat(agent.match(/ rv\:(\d+)/)[1]);
	}
    Browser.name = 'InternetExplorer';
}
else if (agent.indexOf(' edge/') > -1) 
{
    Browser.agent = Browser.browserType.Edge;
    Browser.version = parseFloat(agent.match(/ edge\/(\d+\.\d+)/)[1]);
    Browser.name = 'Edge';
}
else if (agent.indexOf(' firefox/') > -1) 
{
    Browser.agent = Browser.browserType.Firefox;
    Browser.version = parseFloat(agent.match(/ firefox\/(\d+\.\d+)/)[1]);
    Browser.name = 'Firefox';
}
else if (agent.indexOf(' opr/') > -1) 
{
    Browser.agent = Browser.browserType.Opera;
    Browser.version = parseFloat(agent.match(/ opr\/(\d+\.\d+)/)[1]);
    Browser.name = 'Opera';
}
else if (agent.indexOf(' chrome/') > -1) 
{
    Browser.agent = Browser.browserType.Chrome;
    Browser.version = parseFloat(agent.match(/ chrome\/(\d+\.\d+)/)[1]);
    Browser.name = 'Chrome';
}
else if (agent.indexOf(' crios/') > -1) // iOS용 Chrome
{
    Browser.agent = Browser.browserType.Chrome;
    Browser.version = parseFloat(agent.match(/ crios\/(\d+\.\d+)/)[1]);
    Browser.name = 'Chrome';
}
else if (agent.indexOf(' safari/') > -1) 
{
    Browser.agent = Browser.browserType.Safari;
    Browser.version = parseFloat(agent.match(/ version\/(\d+\.\d+)/)[1]);
    Browser.name = 'Safari';
}


if (agent.match(/iphone|ipod|ipad|android|windows ce|blackberry|symbian|windows phone|webos|opera mini|opera mobi|nokia|sonyericsson/i) != null)
{
    Browser.device = Browser.deviceType.Mobile;

    if (agent.indexOf('android') > -1)
    {
        Browser.os = Browser.osType.Android;
        Browser.os_detail_version = agent.match(/ android\ (\d+\.\d+\.\d+)/);
        if (Browser.os_detail_version == null || Browser.os_detail_version == 0)
        {
            Browser.os_detail_version = agent.match(/ android\ (\d+\.\d+)/);
        }
        Browser.os_detail_version = Browser.os_detail_version[1];
        Browser.os_version = parseFloat(Browser.os_detail_version);
    }
    else if (agent.match('/iphone|ipod|ipad/i') != null)
    {
        Browser.os = Browser.osType.iOS;
        Browser.os_detail_version = agent.match(/ os\ (\d+\_\d+\_\d+)/);
        if (Browser.os_detail_version == null || Browser.os_detail_version == 0)
        {
            Browser.os_detail_version = agent.match(/ os\ (\d+\_\d+)/);
        }
        Browser.os_detail_version = Browser.os_detail_version[1].replace('_', '.').replace('_', '.');
        Browser.os_version = parseFloat(Browser.os_detail_version);
    }
    else if (agent.match('/windows ce|windows phone/i') != null)
    {
        Browser.os = Browser.osType.WindowsPhone;
    	if (agent.match(/windows phone os\ (\d+\.\d+)/) != null)
	    {
    	    Browser.os_version = parseFloat(agent.match(/windows phone os\ (\d+\.\d+)/)[1]);
	    }
    	else if (agent.match(/windows phone\ (\d+\.\d+)/) != null)
	    {
    	    Browser.os_version = parseFloat(agent.match(/windows phone\ (\d+\.\d+)/)[1]);
	    }
    }
    else { Browser.os = Browser.osType.EtcMobile; }
}
else if (agent.indexOf('windows') > -1)
{
    Browser.device = Browser.deviceType.PC;

    Browser.os = Browser.osType.Windows;
    Browser.os_version = parseFloat(agent.match(/windows nt\ (\d+\.\d+)/)[1]);
}
else if (agent.indexOf('macintosh') > -1)
{
    Browser.device = Browser.deviceType.PC;

    Browser.os = Browser.osType.Macintosh;
}
else if (agent.indexOf('linux') > -1)
{
    Browser.device = Browser.deviceType.PC;

    Browser.os = Browser.osType.Linux;
}


//------------------------------------------------------------------------------------
// 기능성 스크립트
//------------------------------------------------------------------------------------

// 스크린 가로 사이즈
function fnGetScreenWidth()
{
    var screenWidth;

    switch(Browser.agent) 
    {
        case Browser.browserType.InternetExplorer:
            screenWidth = window.screen.width;
            break;
        case Browser.browserType.Safari:
        case Browser.browserType.Chrome:
            screenWidth = window.innerWidth;
            break;
        case Browser.browserType.Opera:
            screenWidth = Math.min(window.innerWidth, document.body.clientWidth);
            break;
        default: // Firefox, etc.
            screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
            break;
    }

    return screenWidth;
}

// 스크린 세로 사이즈
function fnGetScreenHeight()
{
    var screenHeight;

    switch(Browser.agent) 
    {
        case Browser.browserType.InternetExplorer:
            screenHeight = window.screen.height;
            break;
        case Browser.browserType.Safari:
        case Browser.browserType.Chrome:
            screenHeight = window.innerWidth;
            break;
        case Browser.browserType.Opera:
            screenHeight = Math.min(window.innerWidth, document.body.clientWidth);
            break;
        default: // Firefox, etc.
            screenHeight = Math.min(window.innerWidth, document.documentElement.clientWidth);
            break;
    }

    return screenHeight;
}

// 클라이언트 영역 가로 사이즈
function fnGetClientWidth()
{
    var clientWidth;

    switch(Browser.agent) 
    {
        case Browser.browserType.InternetExplorer:
            clientWidth = document.documentElement.clientWidth;
            break;
        case Browser.browserType.Safari:
        case Browser.browserType.Chrome:
            clientWidth = window.innerWidth;
            break;
        case Browser.browserType.Opera:
            clientWidth = Math.min(window.innerWidth, document.body.clientWidth);
            break;
        default: // Firefox, etc.
            clientWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
            break;
    }
    
    return clientWidth;
}

// 클라이언트 영역 세로 사이즈
function fnGetClientHeight()
{
    var clientHeight;

    switch(Browser.agent) 
    {
        case Browser.browserType.InternetExplorer:
            clientHeight = document.documentElement.clientHeight;
            break;
        case Browser.browserType.Safari:
        case Browser.browserType.Chrome:
            clientHeight = window.innerHeight;
            break;
        case Browser.browserType.Opera:
            clientHeight = Math.min(window.innerHeight, document.body.clientHeight);
            break;
        default: // Firefox, etc.
            clientHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
            break;
    }
    
    return clientHeight;
}

// 스크롤 위치 가져오기
function fnGetScrollTop()
{
    var scrollTop;

    switch(Browser.agent) 
    {
        case Browser.browserType.Safari:
        case Browser.browserType.Chrome:
        case Browser.browserType.Opera:
            scrollTop = document.body.scrollTop;
            break;
        default:
            scrollTop = document.documentElement.scrollTop;
            break;
    }
    
    return parseInt(scrollTop);
}

// 윈도우 사이즈 변경
// <body onload="fnWinResizeBy(828, 398);">
function fnWinResizeBy(width, height)
{
    var clientWidth  = fnGetClientWidth();
    var clientHeight = fnGetClientHeight();

    switch(Browser.agent) 
    {
        case Browser.browserType.Chrome:
            window.resizeTo(width + 16, height + 67)
            break;
        default: // 
            window.resizeBy(width - clientWidth, height - clientHeight)
            break;
    }
    
}

// 팝업
function fnWinOpen(url, name, width, height) 
{
    return window.open(url, name, 'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=' + width + ',height=' + height);
}

// 팝업
function fnWinOpenS(url, name, width, height) 
{
    return window.open(url, name, 'toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=0,width=' + width + ',height=' + height);
}

// 이미지 변경
function fnImageChange(obj, text1, text2)
{
    obj.src = obj.src.replace(text1, text2);
}

// 컨트롤의 위쪽 위치를 가져온다
function GetRealOffsetTop(o)
{
    return o ? o.offsetTop + GetRealOffsetTop(o.offsetParent) : 0;
}

// 컨트롤의 왼쪽 위치를 가져온다
function GetRealOffsetLeft(o)
{
    return o ? o.offsetLeft + GetRealOffsetLeft(o.offsetParent) : 0;
}

function fnSetCookie(name, value, expiredays)
{ 
    var todayDate = new Date();
    //test용  유효시간을 1분동안 설정
    //todayDate.setMinutes(todayDate.getMinutes() + expiredays);

    //유효기간을 하루동안 설정
    todayDate.setDate(todayDate.getDate() + expiredays);
    
    //alert("ccc"+todayDate.toGMTString() );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

function fnGetCookieValue(name)
{
    var strCookieName = name + "=";
    var objCookie = document.cookie;
    
    if (objCookie.length > 0)
    {
        var nBegin = objCookie.indexOf(strCookieName);
        if (nBegin < 0){ return ""; }
        nBegin += strCookieName.length;
        var nEnd = objCookie.indexOf(";", nBegin);
        if (nEnd == -1){ nEnd = objCookie.length; }
    }
    
    return unescape(objCookie.substring(nBegin, nEnd));
}


//------------------------------------------------------------------------------------
// String 프로토타입정의
//------------------------------------------------------------------------------------

// 양쪽 빈 공간 제거
String.prototype.trim = function() 
{
    return this.replace(/(^\s*)|(\s*$)|($\s*)/g, "");
}

// 모든 빈 공간 제거
String.prototype.ctrim = function() 
{
    return this.replace(/(\s*)/g, "").replaceAll('&nbsp;','');
}

// html 태그 제거
String.prototype.htmlRemove = function() 
{
    return this.replace(/<[^>]+>/g, "");
}

// 모든 텍스트 변경
String.prototype.replaceAll = function(oldValue, newValue)
{
	var retValue = this;

	while (retValue.indexOf(oldValue) >= 0)
	{
		retValue = retValue.replace(oldValue, newValue);
	}

	return retValue;
}

// html 태그 제거, 사용법 : 허용할 태그가 존재할 경우 stripTags('<b><i>');
String.prototype.stripTags = function(allowed)
{
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return this.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) { return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''; });
}

String.prototype.stripTags2 = function()
{
    var str = this;

    // 태그 정규식
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;

    if (tags.test(str)) 
    {
        alert('HTML 태그는 사용이 불가합니다. 태그가 삭제되어 저장됩니다.');
    }

    str = str.replace(tags, '');

    // 이벤트 제거 : onclick, onchange, onkeydown, onkeypress, onkeyup, onload
    //tags = /<(.*) (onclick)="(.*[^"])"/gi;
    //str = str.replace(tags, '<$1');

    return str;
}

//------------------------------------------------------------------------------------
// input 값 체크 스크립트
//------------------------------------------------------------------------------------

// 입력값에 숫자만 허용
// 사용예 : <input style="ime-mode:disabled;" onkeypress="fnInputNumCheck(event);" />
function fnInputNumCheck(e)
{
    var keyCode = window.event ? event.keyCode : e.which;
    if ((keyCode < 48) || (keyCode > 57)) 
    {
        if(window.event)
        { 
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        }
        else if(e)
        {
            e.preventDefault();
        }
    }
}

// 입력값에 영숫자만 허용
// 사용예 : <input style="ime-mode:disabled;" onkeypress="fnInputEngNumCheck(event);" />
function fnInputEngNumCheck(e)
{
    var keyCode = window.event ? event.keyCode : e.which;

    var regExp = /[0-9a-zA-Z]+/g;
    var sOrg = String.fromCharCode(keyCode);
    
    if(!regExp.test(sOrg))
    {
        event.returnValue = false;
    }
}

// 입력값에 영숫자,_,-만 허용
// 사용예 : <input style="ime-mode:disabled;" onkeypress="fnInputEngNum2Check(event);" />
function fnInputEngNum2Check(e)
{
    var keyCode = window.event ? event.keyCode : e.which;

    var regExp = /[0-9a-zA-Z-_]+/g;
    var sOrg = String.fromCharCode(keyCode);

    if(!regExp.test(sOrg))
    {
        event.returnValue = false;
    }
}

// 이메일 유효성 확인
function fnEmailExpCheck(email)
{
    var regExp = /[a-z0-9-_]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i;
    
    if(!regExp.test(email))
    {
        return false;
    }
    
    return true;
}

function fnPhoneExpCheck(phone)
{
    var regExp = /(02|0[3-9]{1}[0-9]{1})-[1-9]{1}[0-9]{2,3}-[0-9]{4}$/;
    
    if(!regExp.test(phone))
    {
        return false;
    }
    
    return true;
}

function fnMobileExpCheck(mobile)
{
    var regExp = /01[016789]-[1-9]{1}[0-9]{2,3}-[0-9]{4}$/;
    
    if(!regExp.test(mobile))
    {
        return false;
    }
    
    return true;
}

function fnEngNumExpCheck(str)
{
    var regExp = /^[A-Za-z0-9+]*$/;

    if(!regExp.test(str))
    {
        return false;
    }
    
    return true;
}

function fnKorEngNumExpCheck(str)
{
    var regExp = /^[가-힣A-Za-z0-9+]*$/;

    if(!regExp.test(str))
    {
        return false;
    }
    
    return true;
}


//------------------------------------------------------------------------------------
// textarea 글자수 제한
//------------------------------------------------------------------------------------

// textarea 글자수 제한 (단순 길이로 계산)
// 예제 : <textarea onkeyup="fnMaxLength(this, 10, '');"></textarea>
function fnMaxLength(obj, maxlen, view)
{
	if(obj.value.length > maxlen)
	{
		alert(maxlen + '자까지 입력이 가능합니다.');
		obj.value = obj.value.substr(0, maxlen);
	}

    if (view && view.length > 0)
    {
        document.getElementById(view).innerHTML = obj.value.length;
    }

	obj.focus();
	
	return obj.value.length;
}

// textarea 글자수 제한 (byte로 계산)
// 예제 : <textarea onkeyup="fnMaxLengthBytes(this, 10);"></textarea>
function fnMaxLengthBytes(obj, maxlen)
{
	var li_byte = 0;

	for(var i=0; i < obj.value.length; i++)
	{
		if(escape(obj.value.charAt(i)).length > 4)
		{
			li_byte += 2;
		}
		else
		{
			li_byte++;
		}
	}

	if(li_byte > maxlen)
	{
		alert(maxlen + 'bytes까지 입력이 가능합니다.');
		obj.value = fnMsgCut(obj.value, maxlen);
		li_byte = maxlen;
	}

	obj.focus();
	return li_byte;
}

// byte 단위로 문자열 자르기
function fnMsgCut(msg, maxlen)
{
	var li_byte = 0;
	var retMsg = '';

	for(var i=0; i < msg.length; i++)
	{
		var ch = msg.charAt(i);
		if(escape(ch).length > 4)
		{
			li_byte += 2;
		}
		else
		{
			li_byte++;
		}

		if(li_byte > maxlen) { break; }

		retMsg += ch;
	}

	return retMsg;
}

// 글자수 제한
function fnMaxLengthByte(text)
{
	var li_byte = 0;

	for(var i=0; i < text.length; i++)
	{
		if(escape(text.charAt(i)).length > 4)
		{
			li_byte += 2;
		}
		else
		{
			li_byte++;
		}
	}

	return li_byte;
}

