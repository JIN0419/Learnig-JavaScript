//함수와 추상적 사고 


//13.1 서브루틴으로서의 함수
//반복되는 작업의 일부를 떼어내서 이름을 붙이고, 그 이름울 부르면 실행
//알고리즘을 나타내는 형태

//예제. 윤년 판단 알고리즘
const year = new Date().getFullYear();
if(year % 4 !== 0){
    console.log(`${year} is NOT a leap year.`);
}else if(year % 100 != 0){
    console.log(`${year} IS a leap year.`);
}else if( year % 400 != 0){
    console.log(`${year} is NOT a leap year`);
}else{
    console.log(`${year} IS a leap year`);
}

//프로그램 안에서 위 코드를 여러 번 실행해야 하는데 내용을 수정해야 한다면 일일히 바꿔야 하는 문제 ~> 서브루틴 해결
function printLeapYearStatus(){
    const year = new Date().getFullYear();
    if(year % 4 !== 0){
        console.log(`${year} is NOT a leap year.`);
    }else if(year % 100 != 0){
        console.log(`${year} IS a leap year.`);
    }else if( year % 400 != 0){
        console.log(`${year} is NOT a leap year`);
    }else{
        console.log(`${year} IS a leap year`);
    }
}


//13.2 값을 반환하는 서브루틴으로서의 함수

//위의 예제.. 프로그램이 커졌을 때는 콘솔에 기록하는 것은 의미가 없고 HTML에 결과를 출력하거나, 파일에 저장하거나, 다른 계산에 사용 (값을 반환)
function isCurrentYearLeapYear(){           //함수 이름 - 불리언을 반환하거나 필요한 컨텍스트에서 사용하도록 만든 함수는 is로 시작
    const year = new Date().getFullYear();
    if(year % 4 !== 0){
        return false;
    }else if(year % 100 != 0){
        return true;
    }else if( year % 400 != 0){
        return false;
    }else{
        return true;
    }
}

const dayInMonth = 
    [31, isCurrentYearLeapYear() ? 29 : 28, 31, 30, 31, 31, 30, 31, 30, 31];;

if(isCurrentYearLeapYear()){
    console.log('It is a leap year.');
}


//13.3 함수로서의 함수

//순수한 함수 : 입력이 들어가면 결과가 나오는 수학적인 정의에 충실한 함수. 
//          입력이 같으면 결과도 같음.
//          부수 효과가 없음. (함수를 호출한다고 해서 프로그램의 상태가 바뀌지 않음)

//두 가지 모두 어기는 예제. 입력이 같아도 결과가 항상 다르고, 변수 colorIndex를 바꾸는 부수효과 있음.
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; 
let colorIndex = -1;
function getNextRainbowColor(){
    if( ++colorIndex >= colors.length ){
        colorIndex = 0;
    }
    return colors[colorIndex];
}

//윤년 판단 함수를 순수한 함수로 고치기. 입력이 같으면 결과도 항상 같고, 다른 효과는 없음.
function isLeapYear(year){           
    if(year % 4 !== 0){
        return false;
    }else if(year % 100 != 0){
        return true;
    }else if( year % 400 != 0){
        return false;
    }else{
        return true;
    }
}

//무지개 함수를 순수한 함수로 고치기. 
//방법1 : 외부 변수를 클로저로 감싸기 (입력이 같아도 결과가 다른 수 있음, 부수효과는 없음)
const getNextRainbowColor = (function() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; 
    let colorIndex = -1;
    return function() {
        if( ++colorIndex >= colors.length ){
            colorIndex = 0;
        }
        return colors[colorIndex];
    }
})();

//방법2 (프로그램의 다른 부분에서 getNextRainbowColor()를 호출하면 이 코드도 영향 받음.)
setInterval(function() {
    document.querySelector('.ranibow')
        .style['background-color'] = getNextRainbowColor();
}, 500);

//방법3 이터레이터 사용 (순수한 함수)
function getRainbowIterator() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; 
    let colorIndex = -1;
    return {
        next(){
            if( ++colorIndex >= colors.length ){
                colorIndex = 0;
            }
            return {value: colors[colorIndex], done: false};
        }
    };
}   

const rainbowIterator = getRainbowIterator();
setInterval(function() {
    document.querySelector('.ranibow')
        .style['background-color'] = rainbowIterator.next().value;
}, 500);



//13.4


//13.5 IIFE와 비동기적 코드
//IIFE를 사용하는 사례 중 하나 : 비동기적 코드가 정확히 동작할 수 있도록 새 변수를 새 스코프에 만드는 것.

//예제. 5초 카운트다운 후 "go"출력
var i;
for(i = 5; i >= 0; i--){
    setTimeout(function() {
        console.log(i===0 ? "go!" : i);
    }, (5-i)*1000);
}   //-1이 6번 출력

//블록 스코프 변수가 도입되기 전처럼 함수를 하나 더 사용하여 스코프 새로 만들고 각 단계에서 i의 값이 클로저에 캡쳐되도록
function loopBody(i){
    setTimeout(function() {
        console.log(i===0 ? "go!" : i);
    }, (5-i)*1000);
}
var i;
for(i = 5; i>=0; i--){
    loopBody(i);
}   //스코프 7개(1 외부 스코프, 6 loopBody를 호출할 때마다), 변수 7개 만들어짐

//루프에 한 번 쓰고 말 함수에 이름 붙이지 않고 익명 함수를 만들어 즉히 호출하는 IIFE 사용
var i;
for(i = 5; i >= 0; i--){
    (function(i){
        setTimeout(function() {
            console.log(i===0 ? "go!" : i);
        }, (5-i)*1000);
    })(i);
} 

//블록 스코프 변수 사용
for(let i=5; i>=0; i--){
    setTimeout(function(){
        console.log(i===0 ? "go!" : i);
    }, (5-i)*1000);
}


//13.6 변수로서의 함수
//함수도 호출하기 전에는 다른 변수와 마찬가지로 수동적. 변수가 있을 수 있는 곳에는 함수도 있을 수 있다.
// - 함수에 별명을 붙일 수 있다.
//예) 짧은 코드 안에서 여러번 호출해야하는 함수의 이름이 너무 길어서 짦은 이름의 변수에 저장
function addThreeSquareAddFiveTakeSquareRoot(x){    //이름이 긴 함수
    return Math.sqrt(Math.pow(x+3, 2)+5);
} 
const answer = (addThreeSquareAddFiveTakeSquareRoot(5) + addThreeSquareAddFiveTakeSquareRoot(2)) / addThreeSquareAddFiveTakeSquareRoot(7);

const f = addThreeSquareAddFiveTakeSquareRoot;  //괄호를 붙이면 함수를 호출하고 호출 결과가 저장됨.
const answer = (f(5) + f(2)) / f(7);

//예제2
const Money = require('math-money');

const oneDollar = Money.Dollar(1);

const Dollar = Money.Dollar;
const twoDollars = Dollar(2);


// - 배열에 함수를 넣을 수 있다.
//예) 자주 하는 일을 한 셋으로 묶는 파이프라인
//예제. 그래픽 변형 - 2차원 변형 ( 시각화 소프트웨어를 만들 때는 변형을 파이프라인으로 묶어서 적용하는 경우 많음)
const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI/4;
const zoom = 2;
const offset = [1, -3];

const pipeline = [
    function rotate(p){
        return {
            x: p.x * cos(theta) - p.y * sin(theta),
            y: p.x * sin(theta) + p.y * cos(theta),
        };
    },
    function scale(p){
        return { x: p.x * zoom, y: p.y * zoom};
    },
    function translate(p){
        return { x: p.x + offset[0], y: p.y + offset[1] };
    },
];

const p = { x: 1, y: 1};
let p2 = p;
for(let i =0; i < pipeline.length; i++){
    p2 = pipeline[i](p2);
}


// - 함수를 함수에 전달할 수 있다.
//대표적인 사용 사례) 콜백 (비동기적 프로그래밍의 용도로 전달하는 함수를 콜백이라고 함. 자신을 감싼 함수가 실행을 마쳤을 때 호출됨)
//다른 사례 )
function sum(arr, f){
    if(typeof f != 'function'){ //함수가 아닌 것이 넘어왔을 때 아무것도 하지 않는 것으로
        f = x => x;
    }
    return arr.reduce((a,x) => a += f(x), 0);
}
sum([1,2,3]);
sum([1,2,3], x => x*x);
sum([1,2,3], x => Math.pow(x,3));


// - 함수가 함수를 반환할 수 있다.
//예제. 위의 예제에서 배열과 함수가 아니라 배열 하나만 받아서 제곱의 합을 반환하는 함수가 필요해짐
//방법 1 (필요한 함수가 하나일 때만 적합)
function sumOfSquares(arr){
    return sum(arr, x => x*x);
}
//방법 2 ( 같은 패턴이 계속 반복될 때)
function newSummer(f){
    return arr => sum(arr, f);
}

const sumOfSquares = newSummer( x => x*x);
const sumOfCubes = newSummer(x => Math.pow(x,3));
sumOfSquares([1,2,3]);      //14
sumOfCubes([1,2,3]);        //36



//13.7 재귀
//재귀 : 자기 자신을 호출하는 함수
//함수를 활용하는 중요한 패턴. 같을 일을 반복하면서 그 대상이 점차 줄어드는 상황에 유용
//예제. 건초더미에서 바늘 찾기(건초를 하나씩 제외하면서 같은 일 반복)
function findNeedle(haystack){
    if(haystack.length === 0){      //스택이 비어있는 경우
        return "no haystack here!"
    }
    if(haystack.shift() === 'needle'){  //배열의 첫 번째 요소가 바늘
        return "found it!"
    }
    return findNeedle(haystack);    //배열의 첫 번째 요소가 바늘이 아님
}

findNeedle(['hay', 'hay', 'hay', 'hay', 'needle', 'hay', 'hay']);

//예제2. 숫자의 계승 찾기
function fact(n){
    if(n === 1){
        return 1;
    }
    return n*fact(n-1);
}

