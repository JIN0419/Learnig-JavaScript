

function f(x){
    return x+3;
}

f(5);
x;


//7.2================================
function f1(){
    console.log('one');
}
function f2(){
    console.log('two');
}

f2();
f1();
f2();


const x = 3;
function f(){ 
    console.log(x);
    console.log(y);
}
{
    const y = 5;
    f();
}

//7.3 전역 스코프======================

//함수가 호출하는 스코프에 대단히 의존적인 코드
let name = "Irena";
let age = 25;

function greet(){
    console.log('Hello, ${name}!');
}
function getBirthYear(){
    return new Date().getFullYear() - age ;
}


//사용자 정보를 단일 객체에 보관하는 방법으로서 전역 스코프의 식별자 숫자를 하나 줄였지만 함수들은 여전히 전역 user에 의존하며, 이 객체는 어디서든 수정할 수 있다.
let user = {
    name = "Irena",
    age = 25,
};
function greet(){
    console.log('Hello, ${user.name}!');
}
function getBirthYear(){
    return new Date().getFullYear() - age ;
}


//전역 스코프에 의존하지 않는 코드. 함수들은 모든 스코프에서 호출할 수 있고, 명시적으로 user를 전달받는다.
function greet(user){
    console.log('Hello, ${user.name}!');
}
function getBirthYear(){
    return new Date().getFullYear() - user.age ;
}


//7.4 블록 스코프==========================
/*
var jq = document.createElement('script');
jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type.
jQuery.noConflict();
*/

console.log('before block');
{
    console.log('inside block');
    const x = 3;
    console.log(`x = ${x}`);
}
console.log(`outside block; x = ${x}`);


//4.5 변수 숨기기 ==============================

//스코프 하나가 끝난 다음 다른 스코프(중첩X)
{
    const x = 'blue';
    console.log(x);
}
console.log(typeof x);
{
    const x = 3;
    console.log(X);
}
console.log(typeof x);

//스코프가 중첩되는 경우
{
    let x = 'blue';
    console.log(x);
    {
        let x = 3;
        console.log(x);
    }
    console.log(x);
}
console.log(typeof x);

//스코프가 계층적임을 이해할 수 있는 코드
{
    let x = { color: "blue"};
    let y = x;
    let z = 3;
    {
        let x = 5;
        console.log(x);
        console.log(y.color);
        y.color = "red";
        console.log(z);
    }
    console.log(x.color);
    console.log(y.color);
    console.log(z);
}


//7.6 함수, 클로저, 정적 스코프

//클로저 예시
let globalFunc;
{
    let blockVar = 'a';
    globalFunc = function(){
        console.log(blockVar);
    }
}
globalFunc();


//접근할 수 없는 것에 접근할 수 있는 효과
let f;
{
    let o = { note: 'Safe'};
    f = function(){
        return 0;
    }
}
let oRef = f();
oRef.note = "Not so safe after all!";


//7.7 즉시 호출하는 함수 표현식

const message = (function(){
    const secret = "I'm a secret!";
    return `The secret is ${secret.length} characters long.`;
})();
console.log(message);

//자신이 몇 번 호출되었는지 저장하는 함수
const f = (function() {
    let count = 0;
    return function(){
        return `I have been called ${++count} time(s).`
    }
})();
f();
f();


//7.8 함수 스코프와 호이스팅

//let으로 변수를 선언하면, 선언하기 전에는 존재하지 않음.
let var1;
let var2 = undefined;
var1;
var2;
undefinedVar;

//선언하기 전에 사용하면 에러
x;
let x = 3;

//var로 변수를 선언하면, 선언하기 전에도 사용할 수 있음. (hoisting)
x;
var x = 3;
x;

//호이스팅을 잘 나타내는 좀 더 복잡한 예제(좋은 코드는 아님.)
if(x !==3){
    console.log(y);
    var y = 5;
    if(y === 5){
        var x = 3;
    }
    console.log(y);
}
if(x === 3){
    console.log(y);
}


//var을 이용해서 변수를 선언하면 같은 변수를 여러번 정의해도 무시한다. x를 새로 만든 것이 아님.
var x = 3;
if(x === 3){
    var x = 2;
    console.log(x);
}
console.log(x);

 //7.9 함수 호이스팅===================

 //함수 선언도 스코프 맨 위로 끌어올려짐.
 f();
 function f(){
     console.log('f');
 }

 //변수에 할당한 함수표현식은 끌어올려지지 않음.
 f();
 let f = function(){
     console.log('f');
 }


 //7.10 사각지대 ==============
 
 //let키워드의 도입, 변수의 사각지대 생겨나기 전에는 안전하고 에러가 발생하지 않는 코드
 if(typeof x === "undefined"){
     console.log("x doesn't exist or is undefined");
 }else{
    //x를 사용해도 안전한 코드~~   
 }

//위와 같은 코드를 let으로 변수 선언하면 안전하지 않음. 에러 발생하는 코드
if(typeof x === "undefined"){
    console.log("x doesn't exist or is undefined");
}else{
    //x를 사용해도 안전한 코드~~
}
let x = 5;


//7.11 스트릭트 모드 ================
(function(){
    'use strict';
    
})();

