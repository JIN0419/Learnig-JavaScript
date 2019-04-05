

//5.2 산술 연산자

/*
const x = 5;
const y = 3 - -x;

console.log(y);
*/
/*
const s = "5";
const y = 3 + +s;

console.log(y);

const x1 = 0, x2 = 3, x3 = -1.5, x4 = -6.33;

const p1 = -x1*1;
const p2 = +x2*2;
const p3 = +x3*3;
const p4 = -x4*4;

console.log(p1, p2, p3, p4);
*/
/*
let x = 2;
const r1 = x++ + x++;   //5
const r2 = ++x + ++x;   //11
console.log(r1, r2);
const r3 = x++ + ++x;   //6+8 = 14
const r4 = ++x + x++;   //9+9 = 18
let y = 10;
const r5 = y-- + y--;   //10+9 = 19
const r6 = --y + --y;   //7+6 = 13
const r7 = y-- + --y;   //6+4 = 10
const r8 = --y + y--;   //3+3 = 6
console.log(r3, r4, r5,r6,r7,r8);
*/


//5.3 연산자 우선순위
/*
 let x = 3,y;
 x += y = 6*5/2;
 console.log(x,y);
*/


//5.4 비교 연산자
/*
const n = 5;
const s = "5";
n === s;
n !== s;
n === Number(s);
n !== Number(s);
n == s;
n != s;

const a = {name: "an object"};
const b = {name: "an object"};
a === b;
a !== b;
a == b;
a != b;
*/


//5.5 숫자 비교
/*
let n = 0;
while(true){
    n += 0.1;
    console.log(n);
    if(n === 0.3) break;
}
console.log(`Stopped at ${n}`);
*/
/*
let n = 0;
while(true){
    n += 0.1;
    if(Math.abs(n-0.3) < Number.EPSILON) break;
}
console.log(`Stopped at ${n}`);
*/


//5.6 문자열 병합
/*
console.log(3+5+"8"); //-> 8 +"8" -> "88"
console.log("3"+5+8); //-> "35" + 8 -> "358"
*/


//5.7 논리 연산자


//5.8 AND, OR, NOT
//단축 평가
/*
const skipIt = true;
let x = 0;
const result = skipIt || x++; //skipIt이 true이므로 단축평가가 일어나고 따라서 x++가 실행되지 않음. skipIt이 false라면 두 피연산자를 평가하여야 하고 이때는 x가 증가한다. 따라서 여기서 ++가 부수효과.
console.log(result);
*/
const doIt = true;
let x = 0;
const result = doIt && x++;
console.log(result); //0. 피연산자가 불리언이 아니라면, 결과를 결정한 값이 반환된다.

const options = suppliedOptions || {name: "Default"}
console.log(options);


//조건 연산자
const doIt = false;
const result = doIt ? "Did it!" : "Didn't do it.";