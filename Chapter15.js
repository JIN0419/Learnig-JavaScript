//15. 날짜와 시간

//자바스크립트에서 제공하는 Date객체의 기능 불충분. -> Moment.js 

//15.1 날짜, 타임존, 타임스탬프, 유닉스 시간

//타임존 표현 -> UTC로부터의 시차 기준, 타임존 이름
//자바스크립트에서 Date 인스턴스는 모두 유닉스 시간 원점으로부터 몇 밀리초가 지났는지 나타내는 숫자(유닉스 타임스탬프)
const d = new Date();
console.log(d);             //타임존이 들어간 그레고리력 날짜
console.log(d.valueOf());   //유닉스 타임스탬프

//Sat Jul 13 2019 15:23:07 GMT+0900 (한국 표준시)
//1562998987882

//15.2 Date 객체 만들기
//매개 변수 없이 호출하면 현재 날짜에 해당하는 Date()객체 반환
new Date();                       //Sat Jul 13 2019 15:46:22 GMT+0900 (한국 표준시)

//
new Date(2015,0);                   //Thu Jan 01 2015 00:00:00 GMT+0900 (한국 표준시)
new Date(2015,1,14,13,30,5,500);    //Sat Feb 14 2015 13:30:05 GMT+0900 (한국 표준시)

//유닉스 타임스탬프로 날짜 생성
new Date(0);        //Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
new Date(1000);     //Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
new Date(1463443200000);    //Tue May 17 2016 09:00:00 GMT+0900 (한국 표준시)

//문자열 해석하여 그에 맞는 날짜 반환(표준시 기준)
new Date('June 14, 1903');      //Sun Jun 14 1903 00:00:00 GMT+0827 (한국 표준시)
new Date('June 14, 1903 GMT-0000');      //Sun Jun 14 1903 08:27:52 GMT+0827 (한국 표준시)

//Date 객체의 문제점 : 항상 현재 지역 표준시에 따라 나옴. 타임존을 명시할 방법 X
//항상 내부적으로는 UTC기준으로 저장하고, 출력할 때 운영체제에서 정의한 표준시에 맞게 변환


//15.3 Moment.js
//날짜 관련된 모든 기능 가능한 방대한 라이브러리
// 타임존을 지원하는 버전 / 지원하지 않는 버전 두 가지 존ㄷ재


//15.5 날짜 데이터 만들기
//타임존을 명시하지 않고 날짜를 생성할 때는 어느 타임존이 사용되는지 생각해야함.


//서버에서 날짜 생성하기
//항상 UTC를 사용하거나, 타임존을 명시하는 편이 좋음.
//UTC 날짜를 사용할 수 있는 환경이라면 Date객체의 UTC메서드 사용하기
const d = new Date(Date.UTC(2016,4,27));    //Fri May 27 2016 09:00:00 GMT+0900 (한국 표준시)

//특정 타임존에 있는 서버에서 날짜를 생성할 때는 moment.tz를 써서 Date 인스턴스를 만들면 타임존을 손으로 변환할 필요 없음
const d = moment.tz([2016, 3, 27, 9, 19], 'America/Los_Angeles').toDate();
const s = moment.tz([2016, 3, 27, 9, 19], 'Asia/Seoul').toDate();
console.log(d); //2016-04-27T16:19:00.000Z
console.log(s); //2016-04-27T00:19:00.000Z


//브라우저에서 날짜 생성하기
//브라우저는 운영체제를 통해 타임존 정보를 알 수 있고, 사용자는 일반적으로 그 지역의 시간을 선호함
//앱에서 다른 타임존의 날짜를 처리해야 한다면 Moment.js를 이용해 타임존을 변환


//15.6 날짜 데이터 전송하기
//서버와 브라우저가 다른 타임존에 있을 때 사용자는 자신의 타임존을 기준으로 날짜를 보고싶어함
//Date인스턴스는 날짜를 저장할 때 UTC를 기준으로 유닉스 타임스탬프를 저장, Date 객체를 그냥 전송해도 일반적으로 안전
//가장 안전한 방법은 JSON을 이용하는 것 
const before = { d: new Date()};
before.d instanceof Date
const json = JSON.parse(json);
after.d instanceof Date
typeof after.d


//15.7 날짜 형식
//Date 객체에서 제공하는 날짜 형식은 다양하지 않고, Moment.js의 format 메서드로 날짜를 원하는 형식으로 만들 수 있다.
const moment = require('moment-timezone');

const d = new Date(Date.UTC(1930, 4, 10));

console.log( d.toLocaleDateString());   //1930-5-10
//console.log( d.toLocaleFormat()); 
console.log( d.toLocaleTimeString());   //9:00:00 AM
console.log(d.toTimeString() );         //09:00:00 GMT+0900 (GMT+09:00)
console.log( d.toUTCString() );         //Sat, 10 May 1930 00:00:00 GMT

console.log( moment(d).format("YYYY-MM-DD") );      //1930-05-10
console.log( moment(d).format("YYYY-MM-DD HH:mm") );    //1930-05-10 09:00
console.log( moment(d).format("YYYY-MM-DD HH:mm Z") );  //1930-05-10 09:00 +09:00
console.log( moment(d).format("YYYY-MM-DD HH:mm [UTC]Z") ); //1930-05-10 09:00 UTC+09:00
console.log( moment(d).format("YYYY년 M월 D일 HH:mm") );    //1930년 5월 10일 09:00


console.log( moment(d).format("dddd, MMMM [the] Do, YYYY") );   //Saturday, May the 10th, 1930

console.log( moment(d).format("h:mm a") );  //9:00 am



//15.8 날짜 구성 요소
//Date 인스턴스의 각 구성 요소에 접근할 때 메서드
const d = new Date(Date.UTC(1815, 9, 10));

console.log( d.getFullYear());
console.log( d.getMonth());
console.log( d.getDate());
console.log( d.getDay());
console.log( d.getHours());
console.log( d.getMinutes());
console.log( d.getSeconds());
console.log( d.getMilliseconds());

console.log( d.getUTCFullYear());
console.log( d.getUTCMonth());
console.log( d.getUTCDate());



//15.9 날짜 비교
//Date인스턴스는 날짜를 숫자로 저장하므로 숫자에 쓸 수 있는 비교 연산자를 그대로 쓰면 됨.
const d1 = new Date(1996, 2, 1);
const d2 = new Date(2009, 4, 27);
d1 > d2     //false
d1 < d2     //true


//15.10 날짜 연산
//날짜는 숫자이므로 날짜 -날짜
const msDiff = d2- d1;
const daysDiff = msDiff/1000/60/60/24;

//Array.prototype.sort를 써서 날짜 정렬
const dates = [];

const min = new Date(2017, 0 , 1).valueOf();
const delta = new Date(2020, 0, 1).valueOf() - min;
for(let i = 0; i < 10; i++){
    dates.push(new Date(min + delta*Math.random()));
}
dates.sort((a,b) => b-a);
dates.sort((a,b) => a-b);

//Moment.js에 날짜를 빼거나 더하는 데 유용한 메서드
let m = moment();
m.add(3, 'days');
m.subtract(2, 'years');

m = moment();
m.startOf('year');
m.endOf('month');


//Moment.js 메서드를 체인으로 연결할 수 있음.
let m = moment()
    .add(10, 'hours')
    .subtract(3, 'days')
    .endOf('month');


//15.11 사용자가 알기 쉬운 상대적 날짜
//Moment.js에서 '3일 전' 처럼 날짜를 상대적으로 표시
moment().subtract(10, 'seconds').fromNow();
moment().subtract(44, 'seconds').fromNow();
moment().subtract(45, 'seconds').fromNow();
moment().subtract(5, 'minutes').fromNow();
moment().subtract(44, 'minutes').fromNow();
moment().subtract(45, 'minutes').fromNow();
moment().subtract(5, 'hours').fromNow();
moment().subtract(21, 'hours').fromNow();
moment().subtract(22, 'hours').fromNow();
moment().subtract(300, 'days').fromNow();
moment().subtract(345, 'days').fromNow();
