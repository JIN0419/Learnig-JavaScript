//17 정규표현식

//17.1 부분 문자열 검색과 대체
//큰 문자열 안에 원하는 부분 문자열이 존재하는지 찾기만 하면 될 때는 String.prototype 메서드로 충분
const input = "As I was going to Saint Ives";
input.startsWith("As")      //true
input.endsWith("Ives")      //true
input.startsWith("going", 9)    //true (인덱스 9에서 시작)
input.endsWith("going", 14)     //true (인덱스 14가 문자열의 끝)
input.includes("going")      //true
input.includes("going", 10) //false
input.indexOf("going")      //9
input.indexOf("going", 10)  //-1
input.indexOf("nope")       //-1

input.startsWith("as")                  //false
input.toLowerCase().startsWith("as")    //true

//부분문자열을 찾아 교체 String.prototype.replace 사용
const output = input.replace("going", "walking");
console.log(output);    //As I was walking to Saint Ives


//17.2 정규식 만들기
//자바스크립트의 정규식은 RegExp클래스 <- 생성자로도 정규식을 만들 수 있지만
//간편한 리터럴 문법도 있음
const re1 = new RegExp("going");        // /going/
const re2 = /going/;                    // /going/
//생성자를 써야 하는 특수한 경우를 제외하고는 리터럴 문법 사용 


//17.3 정규식 검색
const re = /\w{3,}/ig;

//문자열의 메서드를 사용할 때
input.match(re);    //정규식에 부합하는 문자들의 배열
input.search(re);   //정규식에 부합하는 첫 단어의 인덱스
input.search(/\w{3,}/ig);   //정규식 리터럴을 직접 써도 됨.

//정규식의 메서드를 사용할 때
re.exec(input);     //문자열에서 정규식에 처음 일치하는 것
re.exec(input);     //그 다음 일치하는 것(exec는 마지막 위치를 기억함)
re.exec(input);     //그 다음 
re.exec(input);     //그 다음 
re.exec(input);     //일치하는 것이 더이상 없으면 null
re.test(input);     //부합하는 것이 하나라도 있으면 true
/\w{3,}/ig.test(input);     //정규식 리터럴을 직접 써도 됨.


//17.4 정규식을 사용한 문자열 교체
const op = input.replace(/\w{4,}/ig, '****');   //"As I was **** to **** ****"


//17.5 입력 소비
//정규식 : 입력 문자열을 소비하는 패턴


//17.6 대체
const html = 'HTML with <a href="/one">one link</a> , and some JavaScript.' + '<script src="stuff.js">';
const match = html.match(/area|a|link|script|source/ig);


//17.7 HTML 찾기
//정규식으로는 HTML을 parse할 수 없음.
//정규식을 HTML에 유용하게 쓸 수는 있지만 완벽하게 분석하는 것은 불가능, 분석할 수 없는 HTML이 항상 존재
const html = '<br> [!CDATA[[<br>]]';
const matches = html.match(/<br>/ig);   //["<br>", "<br>"] 하지만 진짜 <br>태그는 하나뿐


//17.8 문자셋
//문자셋 : 글자 하나를 다른 것으로 대체하는 방법을 간단하게 줄인 것
//이러이러한 문자들이 들어갈 수 있다~
/0|1|2|3|4|5|6|7|8|9/g
/[0123456789]/g
/[0-9]/g

//범위 결합도 가능
/[\-0-9a-z.]/ig

//특정 문자, 범위를 제외하고 찾을 수도 있음
const match = beer99.match(/[^\-0-9a-z.]/);


//17.9 자주 쓰는 문자셋

//공백 상관 없이 필요한 내용 찾기
const stuff = 
    'hight:        9\n' +
    'medium:        5\n'+
    'low:           2\n';
const levels = stuff.match(/:\s*[0-9]/g);

//전화번호 형식 통일하기
const messyPhone = '(050) 555-1515';
const neatPhone = messyPhone.replace(/\D/g, '');

//required필드 검사하기
const field = ' something   ';
const valid = /\S/.test(field);


//17.10 반복
//반복 메타 문자 : 얼마나 많이 일치해야 하는지 지정할 때 사용
/[0-9]+/


//17.11 마침표와 이스케이프
//마침표는 줄바꿈 문자를 제외한 모든 문자에 일치
//도메인 이름, IP주소 등 마침표 자체가 필요할 때는 이스케이프해서 사용

//줄바꿈 문자를 포함해서 모든 문자에 일치하는 것은 [\s\S]


//17.12 그룹
//하위 표현식을 만들고 단위 하나로 취급
//-> 그 그룹에 일치하는 결과를 나중에 쓸 수 있도록 캡쳐 가능
//-> 캡쳐하지 않는 그룹 만들 수 있음 (?:[일치시키려 하는 패턴])

//도메인 이름 찾기
const text = "Visit oreilly.com today!";
const match = text.match(/[a-z]+(?:\.com|\.org|\.edu)/i);

//그룹에도 반복 적용 가능
const html = '<link rel = "stylesheet" href="http://insecure.com/stuff.css">\n' +
     '<link rel = "stylesheet" href="https://secure.com/securestuff.css">\n' +
     '<link rel = "stylesheet" href="//anythin.com/flexible.css">\n';

const matches = html.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/ig);


//17.3 소극적 일치, 적극적 일치
//정규식은 기본적으로 적극적
const input = "Regex pros know the difference between\n" +
    "<i>greedy</i> and <i>lazy</i> matching.";
input.replace(/<i>(.*)<\/i>/ig, '<strong>$1</strong>');

//반복 메타 문자를 소극적으로 만들기. *뒤에 ?  소극적으로 검색
input.replace(/<i>(.*?)<\/i>/ig, '<strong>$1</strong>');


//17.14 역참조

//HTML에서 태그의 속성값 찾기 (속성값에 큰 따움표나 작은따옴표 써야 함)
const html = `<img alt='A "simple" example.'>` + `<img alt = "Don't abuse it!">`;
let matches = html.match(/<img alt=(['"]).*?\1/g);  //소극적 탐색
//["<img alt='A "simple" example.'"]

matches = html.match(/<img alt=(['"]).*\1/g);   //적극적 탐색
//["<img alt='A "simple" example.'><img alt = "Don'"]


//17.15 그룹 교체

//<a>태그에서 href가 아닌 속성을 전부 제거
let html = '<a class = "nope" href="/yep">Yep</a>';
html = html.replace(/<a .*?(href=".*?").*?>/, '<a $1>');
//"<a href="/yep">Yep</a>"

//class속성과 href속성을 남기고 나머지 모두 없애기
html = '<a class="yep" href="/yep" id="nope">Yep</a>';
html = html.replace(/<a .*?(class=".*?").*?(href=".*?").*?>/, '<a $2 $1>');
//"<a href="/yep" class="yep">Yep</a>"

//$1,$2처럼 숫자로 참조하는 것 이외에 
//일치하는 것 앞에 있는 전부 참조 $`
//일치하는 것 자체 $&
//일치하는 것 뒤에 있는 전부 참조 $'
const input = "One two three";
input.replace(/two/, '($`)');   //"One (One ) three"
input.replace(/two/, '($&)');   //"One (two) three"
input.replace(/two/, "($')");   //"One ( three) three"
input.replace(/two/, '($$)');   //"One ($) three"


//17.6 함수를 이용한 교체
//복잡한 정규식을 단순한 정규식으로 분할할 수 있음

//<a> 태그를 정확한 규격에 맞게 바꾸기

html = 
    '<a class="foo" href="/foo" id="foo">Foo</a>\n' +
    '<a href="/bar" Class="bar">Foo</a>\n' +
    '<a href="/baz">Baz</a>\n' +
    `<a onclick = "javascript:alert('qux!')" href="/qux">Qux</a>`;

//class, id, href 속성을 제외한 모든 속성을 제거 -> 순서 문제 해결해야함
function sanitizeATag(aTag){
    const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
    const attributes = parts[1]
        .split(/\s+/);
    return '<a '+attributes
        .filter(attr => /^(?:class|id|href)[\s=]/i.test(attr))
        .join(' ')
        +'>'
        +parts[2]
        +'</a>';
}

//<a> 태그를 찾는 정규식
html.match(/<a .*?>(.*?)<\/a>/ig);

//교체할 매개변수로 함수 넘기기
html.replace(/<a .*?<\/a>/ig, function(m){
    return sanitizeATag(m);
});

html.replace(/<a .*?<\/a>/ig, sanitizeATag);


//17.17 위치 지정
//~~로 시작하는 문자열, --로 끝나는 문자열.. => ~~,--는 정규식의 anchor
//^, $
let input = "It was the best of times, it was the worst of times";
let beginning = input.match(/^\w+/g);
let end = input.match(/\w+$/g);
let everything = input.match(/^.*$/g);
let momatch1 = input.match(/^best/ig);  //null
let nomatch2 = input.match(/worst$/ig); //null

//문자열에 줄바꿈 문자가 들어있으면 각 줄의 처음과 끝을 찾을 수 있다.
input = "One line\nTwo lines\nThree lines\nFour";
beginnings = input.match(/^\w+/mg);     //["One", "Two", "Three", "Four"]
endings = input.match(/\w+$/mg);        // ["line", "lines", "lines", "Four"]


//17.18 단어 경계 일치
//경계 메타 문자 \b와 \B는 입력을 소비하지 않음

//영어 텍스트 안에 들어있는 이메일 주소를 찾아서 하이퍼링크로 바꾸기
inputs = [
    "john@doe.com",
    "john@doe.com is my email",
    "my email is john@doe.com",
    "use john@doe.com, my email",
    "my email:john@doe.com",
];

emailMather = /\b[a-z][a-z0-9._-]*@[a-z][a-z0-9_-]+\.[a-z]+(?:\.[a-z]+)?\b/ig;

inputs.map( s => s.replace(emailMather, '<a href= "mailto:$&">$&</a>'));



//17.19 룩어헤드
//(?=[subexpression])
//앵커나 단어 경계처럼 입력을 소비하지 않음.
//하위 표현식도 소비하지 않고 찾을 수 있음
//문자열이 겹치는 상황에 필요. 

//비밀번호 규칙 (대문자, 소문자, 숫자 포함하고 글자도 숫자도 아닌 문자는 포함X)
function validPassword(p){
    return /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) &&!/[^a-zA-Z0-9]/.test(p);
}

//하나로 묶었으나 의도와 다른 규칙 강요, 잘모된 문자 체크X, 문자 소비
function validPassword(p){
    return /[A-Z].*[0-9][a-z]/.test(p);
}

//룩어헤드 사용 
function validPassword(p){
    return /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?!.*[^a-zA-Z0-9])/.test(p);
}


//17.20 동적으로 정규식 만들기
//동적으로 정규식을 만들어야 할 때 RegExp 생성자 필요(정규식 리터럴이 아닌)

//사용자 이름의 배열이 있고 문자열에서 그 배열을 사용해 일치하는 사용자 이름을 찾고 싶다
const users = ["mary","nick","arthur","sam","yvette"];
const text = "User @arthur started the backup and 15:15, "+"and @nick and @yvette restored it at 18:35.";
const userRegex = new RegExp(`@(?:${users.join('|')})\\b`, 'g');
text.match(userRegex);

