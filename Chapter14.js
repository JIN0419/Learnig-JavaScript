//Chapter 14. 비동기적 프로그래밍

//자바스크립트는 싱글 스레드 ~> 사용자 입력뿐만 아니라 여러 문제를 비동기적 관점에서 생각해야 함.
//(사용자 입력 외에) 비동기적 테크닉을 사용해야 하는 경우
//  - 네트워크 요청(Ajax 호출...)
//  - 파일시스템 작업(파일 읽고 쓰기...)
//  - 의도적으로 시간 지연을 사용하는 기능(알람..)

//12.2 콜백
//콜백 = 나중에 호출할 함수
//일반적인 자바스크립트 함수. 보통 익명 함수 사용.
//보통 다른 함수에 넘기거나, 객체의 프로퍼티로 사용됨.

console.log("Before timeout: " + new Date());
function f(){
    console.log("After timeout: " + new Date());
}
setTimeout(f, 60*1000);
console.log("I happen after setTimeout!");
console.log("Me too!");
//실행결과 : (비동기적으로 실행)
// Before timeout: Fri Jul 12 2019 01:50:02 GMT+0900 (한국 표준시)
// I happen after setTimeout!
// Me too!
// After timeout: Fri Jul 12 2019 01:50:03 GMT+0900 (한국 표준시)

//이름 붙은 함수를 써야 하는 타당한 이유가 없다면 익명 함수 사용
console.log("Before timeout: " + new Date());
setTimeout(function() {
    console.log("After timeout: "+ new Date());
}, 60*1000);
console.log("I happen after setTimeout!");
console.log("Me too!");


//setInterval과 clearInterval

//setTimeout : 콜백함수를 한 번만 실행하고 멈춤.
//setInterval : 콜백을 정해진 주기마다 호출하며 clearInterval을 사용할 때까지 멈추지 않음.
const start = new Date();
let i = 0;
const intervalID = setInterval(function() {
    let now = new Date();
    if( now.getMinutes() != start.getMinutes() || ++i > 10){
        return clearInterval(intervalID);
    }
    console.log(`${i}: ${now}`);
}, 5*1000);


//스코프와 비동기적 실행

//함수를 호출하면 항상 클로저가 만들어짐.
function countdown(){
    let i;
    console.log("Countdown:");
    for(i = 5; i >= 0; i--){
        setTimeout(function() {
            console.log(i === 0 ? "GO!" : i);
        }, (5-i)*1000);
    }
}

countdown(); //-> 변수 i가 들어있는 클로저 만들어짐. for루프 안에서 만드는 콜백은 모두 똑같은 i에 접근
//for루프 안에서 (5-i)*1000부분의 i는 제대로 동작 <- 동기적으로 실행됨. setTimeout 호출 역시 동기적.
//setTimeout을 동기적으로 호출해야만 콜백을 언제 호출할지 계산할 수 있음. 비동기적인 부분은 setTimeout에 전달된 함수.

//해결방법 1 : IIFE
function countdown(){
    var i;
    for(i = 5; i>=0; i--){
        (function(i){
            setTimeout(function(){
                console.log(i ===0 ? "go!" : i);
            }, (5-i)*1000);
        })(i);
    }
}
countdown();

//해결방법 2: i를 for 루프 선언부에서 선언
function countdown(){
    console.log("Countdown:");
    for(let i = 5; i >= 0; i--){
        setTimeout(function() {
            console.log(i === 0 ? "GO!" : i);
        }, (5-i)*1000);
    }
}
countdown();


//오류 우선 콜백
//콜백을 사용하면 예외처리가 어려워지므로 콜백과 관련된 에러를 처리할 방법의 표준 필요
//나타난 첫번째 방안 - 콜백의 첫 번째 매개변수에 에러 객체 사용.(null이나 undefined면 에러 없는 것)

const fs = require('fs');
const fname = 'may_or_may_not_exist.txt';
fs.readFile(fname, function(err, data){
     if(err){       //콜백에서 가장 먼저 하는 일 : err이 참 같은 값인지 확인 -> 그럼 파일을 읽는데 문제가 있다는 것이므로 콘솔에 오류를 보고하고 즉시 빠져나옴.
         return console.error(`error reading file ${fname}: ${err.message}`);
     }
     console.log(`${fname} contents: ${data}`);
});


//콜백 헬
//한 번에 여러 가지를 기다려야 한다면 콜백을 관리하기 상당히 어려움.
//예제 : 세 개의 파일의 콘텐츠를 읽고 60초가 지난 다음 이들을 결합해 네 번째 파일에 기록
const fs = require('fs');
fs.readFile('a.txt', function(err, dataA){
    if(err){
        console.error(err);
    }
    fs.readFile('b.txt', function(err, dataB){
        if(err){
            console.error(err);
        }
        fs.readFile('c.txt', function(err, dataC){
            if(err){
                console.error(err);
            }
            setTimeout(function() {
                fs.writeFile('d.txt', dataA + dataB + dataC, function(err){
                    if(err){
                        console.error(err);
                    }
                });
            }, 60*1000);
        });
    });
});
//<-콜백 헬

//위의 예제는 에러를 기록하기만. 에러를 일으키기까지 하는 예제
const fs = require('fs');
function readSketchyFile(){
    try{
        fs.readFile('does_not_exist.txt', function(err, data){
            if(err){
                throw err;
            }
        })
    } catch(err){
        console.log('warning: minor issue occurred, program continuing');
    }
}
readSketchyFile();
//<-try...catch블록은 같은 함수 안에서만 동작하는데 예외는 fs.readFile이 콜백으로 호출하는 익명 함수 안에서 일어남.


//14.3 프라미스
//콜백의 단점을 해결하기 위해 만들어짐. 콜백을 대체하느 것은 아니고 프라미스에서도 콜백을 사용.
//콜백을 예측 가능한 패턴으로 사용할 수 있게 하며, 프라미스 없이 콜백만 사용할 때 나타날 수 있는 엉뚱한 현상이나 찾기힘든 버그를 상당수 해결
//기본 개념 : 프라미스 기반 비동기적 함수 호출 -> 그 함수는 Promise 인스턴스 반환 -> 성공, 실패 두 가지 뿐
//성공이든 실패든 단 한 번만 일어나며 나중에 번복되는 경우 없음.
//프라미스는 객체이므로 어디든 전달할 수 있음. 비동기적 처리를 다른 함수에서 처리하게 하고 싶으면 프라미스를 넘기면 됨.

//프라미스 만들기
//성공과 실패 콜백이 있는 함수로 새 Promise 인스턴스를 만들기만 하면 됨.
function countdown(seconds) {
    return new Promise(function(resolve, reject){
        for(let i = seconds; i >= 0; i--){
            setTimeout(function() {
                if(i > 0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000);
        }
    });
}

//프라미스 사용

//반환된 프라미스를 사용하는 예제
countdown(5).then(
    function(){
        console.log("countdown completed successfully");
    },
    function(err){
        console.log("countdown experienced an error: " + err.message);
    }
)
//반환된 프라미스를 변수에 할당하지 않고 then핸들러를 바로 호출
//then핸들러는 성공콜백이 실행되거나 에러콜백이 실행되거나

//프라미스는 catch핸들러도 지원
const p = countdown(5);
p.then(function() {
    console.log("countdown completed successfully");
});
p.catch(function(err){
    console.log("countdown experienced an error: " +err.message);
});

//에러 일어나게 한 예제
function countdown(seconds){
    return new Promise(function(resolve, reject){
        for(let i = seconds; i >=0 ; i--){
            setTimeout(function() {
                if(i===13){
                    return reject(new Error("Oh my god"));
                }
                if(i > 0){
                    console.log(i + '...');
                }
                else{
                    resolve(console.log("GO!"));
                }
            }, (seconds-i)*1000);
        }
    });
}

countdown(15);  //reject나 resolve가 함수를 멈추지는 않음
// 15...
// 14...
// Uncaught (in promise) Error: Oh my god
//    at <anonymous>:6:35
// 12...
// 11...
// 10...
// 9...
// 8...
// 7...
//(생략)


//이벤트
//이벤트가 일어나면 이벤트 발생을 담당하는 개체에서 이벤트가 일어났음을 알림
//콜백을 통해서 이벤트를 주시할 수 있음. 
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter{
    constructor(seconds, superstitious){
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go(){
        const countdown = this;
        return new Promise(function(resolve, reject){
            for(let i = countdown.seconds; i >= 0; i--){
                setTimeout(function(){
                    if(countdown.superstitious && i ===13){
                        return reject(new Error("Oh my god"));
                    }
                    countdown.emit('tick',i);
                    if(i===0){
                        resolve();
                    }
                }, (countdown.seconds-i)*1000);
            }
        }); 
    }
}

const c  = new Countdown(5);

c.on('tick', function(i){
    if(i > 0){
        console.log(i + '...');
    }
});
c.go()
    .then(function(){
        console.log('GO!');
    })
    .catch(function(err){
        console.error(err.message);
    })

//5...
//4...
//3...
//2...
//1...
//GO!


//
const c  = new Countdown(15,true)
    .on('tick', function(i){
        if(i > 0){
            console.log(i + '...');
        }
    });
c.go()
    .then(function(){
        console.log('GO!');
    })
    .catch(function(err){
        console.error(err.message);
    })
//Countdown인스턴스가 13에 도달했을 때 프라미스를 파기했는데도 카운트다운 계쏙 진행
//15...
//14...
//Oh my god
//12...
//11...
//10...
//9...
//8...
//7...
//6...
//5...
//4...
//3...
//2...
//1...


//해결 : 더 진행할 수 없다는 사실을 아는 즉시, 대기중인 타임아웃을 모두 취소
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter{
    constructor(seconds, superstitious){
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go(){
        const countdown = this;
        const timeoutIds = [];  ///
        return new Promise(function(resolve, reject){
            for(let i = countdown.seconds; i >= 0; i--){
                timeoutIds.push(setTimeout(function(){      ///
                    if(countdown.superstitious && i ===13){
                        timeoutIds.forEach(clearTimeout);   ///
                        return reject(new Error("Oh my god"));
                    }
                    countdown.emit('tick',i);
                    if(i===0){
                        resolve();
                    }
                }, (countdown.seconds-i)*1000));
            }
        }); 
    }
}


//프라미스 체인
