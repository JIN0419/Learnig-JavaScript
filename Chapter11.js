//11. 예외와 에러 처리

//예외 처리 : 에러를 컨트롤 하는 메커니즘. 예상치 못한 상황에 대처하는 방식

//11.1 Error 객체
//자바스크립트에는 내장된 Error 객체가 있음. 
//인스턴스를 만들면서 에러 메세지 지정. 인스턴스는 에러와 통신하는 수단.
 const err = new Error('invalid email');

 //예제. 이메일 주소의 유효성을 검사하는 함수. 이메일 주소가 올바르면 이메일 주소를 반환
 function validateEmail(email){
    return email.match(/@/) ?
        email :
        new Error(`Invalid email: ${email}`);
 }

 //instanceof 연산자를 써서 Error 인스턴스가 반환됐는지 확인
 const email = "jane@doe.com";

 const validEmail = validateEmail(email);
 if(validEmail instanceof Error){
     console.error(`Error: ${validEmail.message}`);
 }else{
     console.log(`Valid email: ${validEmail}`);
 }


 //11.2 try/catch와 예외 처리
 //예외 처리는 try...catch문을 사용
 
 //이전 예제와 달리 예상치 못한 에러에 대처하기 위해
 const email = null;

 try{
     const validEmail = validateEmail(email);
     if(validEmail instanceof Error){
         console.error(`Error: ${validEmail.message}`);
     }else{
         console.log(`Valid email: ${validEmail}`);
     }
 }catch(err){
     console.error(`Error: ${err.message}`);
 }


//11.3 에러 일으키기
//에러를 일으키기만 기다릴 필요 없이 직접 에러를 일으켜서 예외 처리 작업을 할 수도 있음.
function billPay(amount, payee, account){
    if(amount > account.balance){
        throw new Error("insufficient funds");
    }
    account.transfer(payee, amount);    //throw를 호출하면 즉시 현재 함수의 실행을 멈추기 때문에 호출되지 않음.
}


//11.4 예외 처리와 호출 스택
//함수a가 함수b를 호출하고 함수b가 함수c를 호출한 경우.. 
//c에서 에러가 일어났다면 호출 스택은 c에서 일어난 에러를 보고하면서 b가 c를 호출, b는 a에서 호출됐다는 것도 함께 알려줌.
//Error 인스턴스에는 스택을 문자열로 표현한 stack 프로퍼티가 있음.
function a(){
    console.log('a: calling b');
    b();
    console.log('a: done');
}
function b(){
    console.log('b: calling c');
    c();
    console.log('b: done');
}
function c(){
    console.log('c: throwing error');
    throw new Error('c error');
    console.log('c: done');
}
function d(){
    console.log('d: calling c');
    c();
    console.log('d: done');
}

try{
    a();
}catch(err){
    console.log(err.stack);
}

try{
    d();
}catch(err){
    console.log(err.stack);
}   //a: calling b
    //b: calling c
    //c: throwing error
    //Error: c error                    //스택 추적1
    //  at c (<anonymous>:13:11)
    //  at b (<anonymous>:8:5)
    //  at a (<anonymous>:3:5)
    //  at <anonymous>:23:5
    //d: calling c
    //c: throwing error
    //Error: c error                    //스택 추적2
    //  at c (<anonymous>:13:11)
    //  at d (<anonymous>:18:5)
    //  at <anonymous>:29:5


//11.5 try...catch...finally
//try블록의 코드가 일종의 '자원'을 처리할 경우 프로그램에서 이 자원을 계속 가지고 있을 수는 없으므로 어느 시점에서는 해제해야함.
//에러가 일어나든, 일어나지 않든 반드시 호출되는 finally 블록 필요
try{
    console.log("this line is executed...");
    throw new Error("whoops");
    console.log("this line is not...");
} catch(err){
    console.log("there was an error...");
} finally {
    console.log("...always executed");
    console.log("perform cleanup here");
}   // this line is executed...
    // there was an error...
    // ...always executed
    // perform cleanup here

//throw문을 주석 처리한 후 실행한 결과
    // this line is executed...
    // this line is not...
    // ...always executed
    // perform cleanup here



