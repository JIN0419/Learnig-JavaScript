//이터레이터와 제너레이터

//이터레이터 : '지금 어디있는지' 파악할 수 있도록
//이터러블 객체의 예) 배열

const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly",
    "Like a tea tray in the sky",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!"
];

//values메서드를 사용하여 이터레이터 만듬
const it = book.values();

//이터레이터의 next메서드 사용하여 읽기 시작
//next메서드 -> { value 프로퍼티, done 프로퍼티 }
//마지막을 반환했다고 해서 끝난 것은 아님. value가 undefined가 되어도 next 계속 호출 가능.
console.log( it.next() );   //{value: "Twinkle, twinkle, little bat!", done: false}
console.log( it.next() );   //{value: "How I wonder what you're at!", done: false}
console.log( it.next() );   //{value: "Up above the world you fly", done: false}
console.log( it.next() );   //{value: "Like a tea tray in the sky", done: false}
console.log( it.next() );   //{value: "Twinkle, twinkle, little bat!", done: false}
console.log( it.next() );   //{value: "How I wonder what you're at!", done: false}
console.log( it.next() );   //{value: undefined, done: true} 
console.log( it.next() );   //{value: undefined, done: true}
console.log( it.next() );   //{value: undefined, done: true}

//요소를 나열하기 위해 for루프나 for...of루프 사용 가능
//while루프로 for...of루프 처럼
const it = book.values();
let current = it.next();
while(!current.done){
    console.log(current.value);
    current = it.next();
}

//이터레이터는 모두 독립적이므로 각각 다른 요소를 가리키는 이터레이터 여러 개를 동시에 사용 가능
const it1 = book.values();
const it2 = book.values();
it1.next();
it1.next();
it2.next();
it1.next();


//12.1 이터레이션 프로토콜
//이터레이션 프로토콜 : 클래스에 심볼 메서드 Symbol.iterator가 있고 이 메서드가 이터레이터처럼 동작하는 객체를 반환한다면 그 클래스의 인스턴스는 이터러블 객체라는 뜻
//이터레이터 프로토콜은 모든 객체를 이터러블 객체로 바꿀 수 있다.

//예제. 메세지에 타임스탬프를 붙이는 로그 클래스, 로그를 기록한 항목을 순회
class Log{
    constructor() {
        this.messages = [];
    }
    add(message){
        this.messages.push({ message, timestamp: Date.now() });
    }
    [Symbol.iterator](){
        return this.messages.values();
    }
}

const log = new Log();
log.add("first day at sea");
log.add("spotted whale");
log.add("spotted another vessel");

for(let entry of log){
    console.log(`${entry.message} @ ${entry.timestamp}`);
}   //first day at sea @ 1562660112214
    //spotted whale @ 1562660112214
    //spotted another vessel @ 1562660112214

//messages 배열에서 이터레이터를 가져와 이터레이터 프로토콜을 구현하는 것이 아닌 직접 이터레이터를 만드는 방법
class Log{
    constructor() {
        this.messages = [];
    }
    add(message){
        this.messages.push({ message, timestamp: Date.now() });
    }
    [Symbol.iterator](){
        let i = 0;
        const messages = this.messages;
        return{
            next() {
                if(i >= messages.length){
                    return { value: undefined, done: true};
                }
                return { value: messages[i++], done: false};
            }
        }
    }
}


//무한한 데이터에 사용하기에도 알맞음.
//예제2. 피보나치 수열
class FibonacciSequence{
    [Symbol.iterator](){
        let a = 0, b = 1;
        return {
            next(){
                let rval = { value: b, done: false};
                b += a;
                a = rval.value;
                return rval;
            }
        };
    }
}

const fib = new FibonacciSequence();
let i = 0;
for(let n of fib){
    console.log(n);
    if(++i > 9){
        break;
    }
}


//12.2 제너레이터
//제너레이터 : 이터레이터를 사용해 자신의 실행을 제어하는 함수

//예제. 무지개 색깔을 반환하는 제너레이터
function* rainbow(){    //function 뒤에 *붙인 것이 제너레이터 문법
    yield 'red';
    yield 'orange';
    yield 'yellow';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}
//제너레이터 호출 -> 이터레이터 얻음.
const it = rainbow();
console.log( it.next() );   //{value: "red", done: false}
console.log( it.next() );   //{value: "orange", done: false}
console.log( it.next() );   //{value: "yellow", done: false}
console.log( it.next() );   //{value: "green", done: false}
console.log( it.next() );   //{value: "blue", done: false}
console.log( it.next() );   //{value: "indigo", done: false}
console.log( it.next() );   //{value: "violet", done: false}
console.log( it.next() );   //{value: undefined, done: true}

//-> for...of 루프에서 사용 가능
for(let color of rainbow()){
    console.log(color);
}   //red
    //orange
    //yellow
    //green
    //blue
    //indigo
    //violet


//yield 표현식과 양방향 통신
//제너레이터와 호출자 사이의 양방향 통신은 yield 표현식을 통해 이루어짐.
//표현식은 값으로 평가되고 yield는 표현식이므로 반드시 어떤 값으로 평가됨. 
//yield 표현식의 값 : 호출자가 제너레이터의 이터레이터에서 next를 호출할 때 제공하는 매개변수
function* interrogate(){
    const name = yield "What is your name?";
    const color = yield "What is your favorite color?";
    return `${name}'s favorite color is ${color}.`;
}
 
const it = interrogate();
it.next();          //{value: "What is your name?", done: false}
it.next('Ethan');   //{value: "What is your favorite color?", done: false}
it.next('orange');  //{value: "Ethan's favorite color is orange.", done: true}


//제너레이터와 return
//제너레이터에서 return문을 사용하면 done은 true가 되고 value는 return이 반환하는 값이 됨.
function* abc(){
    yield 'a';
    yield 'b';
    return 'c';
}

//제너레이터에서 done이 true이면 value프로퍼티에 주의를 기울이지 않음.
const it = abc();
console.log( it.next() );   //{value: "a", done: false}
console.log( it.next() );   //{value: "b", done: false}
console.log( it.next() );   //{value: "c", done: true}

//for...of루프에서 사용하면 c는 절대 출력되지 않음
for(let l of abc()){
    console.log(l);
}   //a
    //b