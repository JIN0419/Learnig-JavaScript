//16 Math
//자바스크립트의 숫자는 모두 IEEE 754 64비트 부동소수점 숫자

//16.1 숫자 형식
//자바스크립트의 숫자 형식 메서드는 숫자가 아니라 문자열 반환
//-> 숫자를 저장, 계산할 때는 따로 형식을 지정하지 않은 숫자 타입이어야 하고, 숫자 형식을 바꾸는 건 실제로 표시하기 직전에 해야함

// - 고정 소수점 - toFixed()
const x = 19.51;
console.log( x.toFixed(3) );    //19.510
console.log( x.toFixed(2) );    //19.51
console.log( x.toFixed(1) );    //19.5
console.log( x.toFixed(0) );    //20
//버림이 아니라 반올림

// - 지수 표기법 - toExponential()
const x = 3800.5;
console.log( x.toExponential(4) );  //3.8005e+3
console.log( x.toExponential(3) );  //3.801e+3
console.log( x.toExponential(2) );  //3.80e+3
console.log( x.toExponential(1) );  //3.8e+3
console.log( x.toExponential(0) );  //4e+3
//반올림

// - 고정 전체 자리수 - toPrecision()
//소수점이 어디 나타나든 관계없이 숫자 몇 개로 표현하느냐 
let x = 1000;
console.log( x.toPrecision(5) );    //1000.0
console.log( x.toPrecision(4) );    //1000
console.log( x.toPrecision(3) );    //1.00e+3
console.log( x.toPrecision(2) );    //1.0e+3
console.log( x.toPrecision(1) );    //1e+3

x = 15.335;
console.log( x.toPrecision(6) );    //15.3350
console.log( x.toPrecision(5) );    //15.335
console.log( x.toPrecision(4) );    //15.34
console.log( x.toPrecision(3) );    //15.3
console.log( x.toPrecision(2) );    //15
console.log( x.toPrecision(1) );    //2e+1

// - 다른 진수 - toString(기수)
x = 12;
console.log( x.toString() );    //12
console.log( x.toString(10) );  //12
console.log( x.toString(16) );  //c
console.log( x.toString(8) );   //14
console.log( x.toString(2) );   //1100

// - 고급 숫자 형식
// 수천 자리의 아주 큰 숫자, 괄호 등 음수 표현을 다르게, 공학 표기법, milli-, micro-, kilo-, mega- 등의 SI 접두사
//등이 필요하면 Numberal.js 라이브러리 사용


//16.2 상수
//Math 객체에는 몇 가지 중요한 상수가 프로퍼티로 내장돼 있음

//기본적인 상수
console.log( Math.E );  //e (자연로그의 밑수, 2.718...)
console.log( Math.PI ); //원주율 (3.1415...)

//로그 관련 상수
console.log( Math.LN2 );    //2의 자연 로그 (0.693...)
console.log( Math.LN10 );   //10의 자연 로그(2.302...)
console.log( Math.LOG2E );  //밑이 2인 로그 e (1.442...)
console.log( Math.LOG10E ); //상용로그 e (0.434...)

//대수 관련 상수
console.log( Math.SQRT1_2); // 1/2의 제곱근 (0.707...)
console.log( Math.SQRT2 );  // 2의 제곱근 (1.414...)


//16.3 대수 함수

// - 거듭 제곱
//제곱 관련 기본 함수는 Math.pow이며 제곱근, 세제곱근.. 등 자주 쓰이는 연산에는 간편함수가 있음

// - 로그 함수
//Math.log는 자연로그 함수, Math.log10은 상용로그 함수

// - 기타 함수
//절댓값, 부호, 배열의 최솟값/최댓값 등

// - 의사 난수 생성
//Math.random() -> [0,1) 숫자 반환
//시드 숫자를 쓸 수 없음. 그럴 때는 seedrandom.js 패키지 



//16.4 삼각함수
//사인, 코서인, 탄젠트, 아크 사인, 아크 코사인, 아크 탄젠트. 라디언 값을 기준으로 함.
//매개변수에 라디언 값으로. (계산법: 각도/180*파이)

//16.5 쌍곡선 함수
