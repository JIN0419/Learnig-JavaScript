//객체와 객체지향 프로그래밍

//9.1 프로퍼티 나열
//객체 프로퍼티에는 순서가 없음!!!

//for...in
const SYM = Symbol();
const o = { a:1, b:2, c:3, [SYM]:4};
for(let prop in o){
    if( !o.hasOwnProperty(prop)){
        continue;
    }
    console.log(`${prop}: ${o[prop]}`);     
}//a: 1
 //b: 2
 //c: 3
//키가 심볼인 프로퍼티는 포함되지 않음.

//Object.keys 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환. 객체의 프로퍼티 키를 배열로 가져와야 할 때.
const SYM = Symbol();
const o = { a:1, b:2, c:3, [SYM]:4};
Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`)); //위의 예제와 같은 결과

//Object.keys 사용이 유용한 예제. 객체에서 x로 시작하는 프로퍼티를 모두 가져오기
const o = {apple:1, xochitl:2, balloon:3, guitar:4, xylophone:5};
Object.keys(o)
    .filter(prop => prop.match(/^x/))
    .forEach(prop => console.log(`${prop}: ${o[prop]}`));   //xochitl: 2
                                                            //xylophone: 5

                                                            
//9.2 객체지향 프로그래밍

//클래스와 인스턴스 생성
//클래스 만들기. 아직 인스턴스는 만들어지지 않았지만 언제든 만들 수 있음.
class Car{
    constructor(){
    }
}

//인스턴스 만들기. new키워드 사용
const car1 = new Car();
const car2 = new Car();

//instanceof 연산자. 객체가 클래스의 인스턴스인지 확인
car1 instanceof Car     //true
car1 instanceof Array   //false

//Car클래스 업데이트
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.userGears = ['P', 'N', 'R', 'D'];
        this.userGear = this.userGears[0];
    }
    shift(gear){
        if(this.userGears.indexOf(gear)<0){
            throw new Error(`Invalid gear: ${gear}`);
        }
        this.userGear = gear;
    }
}

const car1 = new Car("Tesla", "Model S");
const car2 = new Car("Mazda", "3i");
car1.shift('D');
car2.shift('R');
car1.userGear   //"D"
car2.userGear   //"R"

//위의 코드에서 기어 프로퍼티를 잘못된 값으로 바꿀 수 있다는 문제점을 어느정도 개선한 Car 클래스.
//(자바스크립트에는 메서드와 프로퍼티에 접근 수준을 설정할 수 있는 메커니즘이 없음.)
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ['P', 'N', 'R', 'D']; //외부에서 접근하면 안되는 프로퍼티 이름 앞에 밑줄로 명시
        this._userGear = this.userGears[0];
    }
    get userGear() { return this._userGear;}
    set userGear(value){
        if(this._userGears.indexOf(value)<0){
            throw new Error(`Invalid gear: ${value}`);
        }
        this._userGear = value;
    }
    shift(gear){
        this.userGear = gear;
    }
}

//기어 프로퍼티를 완벽히 보호하는 Car클래스
const Car = (function() {
    const carProps = new WeakMap(); //스코프를 이용해 보호하는 WeakMap인스턴스
    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D']; //외부에서 접근하면 안되는 프로퍼티 이름 앞에 밑줄로 명시
            carProps.set(this, {userGear: this._userGears[0]});
        }
        get userGear() { 
            return carProps.get(this).userGear;
        }
        set userGear(value){
            if(this._userGears.indexOf(value) < 0){
                throw new Error(`Invalid gear: ${value}`);
            }
            carProps.get(this).userGear = value;
        }
        shift(gear){
            this.userGear = gear;
        }
    }

    return Car;
})();


//클래스는 함수다
//ES5에서 클래스 만드는 법
function Car(make, model) {
    this.make = make;
    this.model = model;
    this._userGears = ['P','N','R','D'];
    this._userGear = this.userGears[0];
} 
//ES6와 ES5비교
class Es6Car {}
function Es5Car() {}
console.log( typeof Es6Car);        //function
console.log( typeof Es5Car);        //function


//프로토타입
//클래스의 인스턴스에서 사용할 수 있는 메서드   
//Car.prototype.shift = Car#shift
//모든 함수에는 prototype이라는 특별한 프로퍼티가 있음. 
//new 키워드로 만든 새 객체는 생성자의 프로토타입 프로퍼티에 접근하여 그것을 __proto__프로퍼티에 저장.
//동적 디스패치..
const car1 = new Car();
const car2 = new Car();
car1.shift === Car.prototype.shift;     //true
car1.shift('D');
car1.shift('d');            //Uncaught Error: Invalid gear: d
car1.userGear;              //"D"
car1.shift === car2.shift   //true

car1.shift = function(gear){
    this.userGear = gear.toUpperCase();
}
car1.shift === Car.prototype.shift; //false
car1.shift === car2.shift;          //false
car1.shift('d');
car1.userGear;                      //"D"


//정적 메서드
//특정 인스턴스에 적용되지 않음. 클래스에 관련되지만 인스턴스와는 관련이 없는 범용적인 작업에 사용
class Car {
    static getNextVin(){
        return Car.nextVin++;
    }
    constructor(make,model){
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }
    static areSimilar(car1, car2){  //두 자동차의 제조사와 모델이 모두 같으면 true 반환
        return car1.make === car2.make  &&  car1.model === car2.model;
    }
    static areSame(car1, car2){    //두 자동차의 VIN이 같으면 true 반환 
        return car1.vin === car2.vin;
    }
}

Car.nextVin = 0;
const car1 = new Car("Tesla", "S");
const car2 = new Car("Mozda", "3");
const car3 = new Car("Mozda", "3");
console.log(car1.vin);      //0
console.log(car2.vin);      //1
console.log(car3.vin);      //2
console.log(Car.areSimilar(car1,car2)); //false
console.log(Car.areSimilar(car2,car3)); //true
console.log(Car.areSame(car2,car3));    //false
console.log(Car.areSame(car2,car2));    //true


//상속
//자바스크립트는 객체의 프로토타입에서 메서드를 찾지 못하면 프로토타입의 프로토타입 검색 ~~> 프로토타입 체인
class Vehicle{
    constructor(){
        this.passengers = [];
        console.log("Vehicle created");
    }
    addPassenger(p){    //대부분의 운송수단은 승객을 태움
        this.passengers.push(p);
    }
}

class Car extends Vehicle{  //extends -> Car를 Vehicle의 서브클래스로 만듬
    constructor() {
        super();        //슈퍼클래스의 생성자 호출(서브클래스에서는 반드시 호출해야함)
        console.log("Car created");
    }
    deployAirbags(){    //보트가 아닌 자동차에만 적합
        console.log("BWOOSH!");
    }
}

const v = new Vehicle();    //Vehicle created
v.addPassenger("Frank");
v.addPassenger("July");
console.log(v.passengers);  //(2) ["Frank", "July"]
const c = new Car();        //Vehicle created
                            //Car created
c.addPassenger("Alice");
c.addPassenger("Cameron");
console.log(c.passengers);  //(2) ["Alice", "Cameron"]
v.deployAirbags();          //Uncaught TypeError: v.deployAirbags is not a function
c.deployAirbags();          //BWOOSH!


//다형성
//여러 슈퍼클래스의 멤버인 인스턴스
//자바스크립트에서 모든 객체가 다형성을 갖고 있다고 할 수 있음.
//instanceof연산자 : 객체가 클래스의 인스턴스인지 확인
class Motorcycle extends Vehicle {}
const c = new Car();
const m = new Motorcycle();
console.log( c instanceof Car );        //true
console.log( c instanceof Vehicle);     //true
console.log( m instanceof Car );        //false
console.log( m instanceof Motorcycle);  //true
console.log( m instanceof Vehicle);     //true


//객체 프로퍼티 나열 다시 보기
//객체.hasOwnProperty(프로퍼티) : 객체에 프로퍼티가 있다면 true 반환, 객체에 정의되지 않았거나 프로토타입 체인에만 정의되었다면 false반환
class Super{
    constructor(){
        this.name = 'Super';
        this.isSuper = true;
    }
}
Super.prototype.sneaky = 'not recommended!!';

class Sub extends Super{
    constructor(){
        super();
        this.name = 'Sub';
        this.isSub = true;
    }
}

const obj = new Sub();

for(let p in obj){
    console.log(`${p}: ${obj[p]}`+ (obj.hasOwnProperty(p) ? '':' (inherited)'));
} //name: Sub
  //isSuper: true
  //isSub: true
  //sneaky: not recommended!! (inherited)

   
//문자열 표현
//모든 객체는 Object를 상속하기 때문에 toString메서드로 객체의 중요한 정보를 제공하면 유용
class Car{
    toString(){
        return `${this.make} ${this.model}: ${this.vin}`;
    }
} 


//9.3 다중 상속, 믹스인, 인터페이스
//믹스인 : 기능을 필요한 만큼만 섞어 놓음. 자바스크립트는 단일 상속 언어이지만 관대한 언어라서 어떤 기능을 언제든 어떤 객체에 추가할 수 있다.
//예제. 보험 가입 믹스인 만들기
class InsurancePolicy{}
function makeInsurable(o){
    o.addInsurancePolicy = function(p){
        this.InsurancePolicy = p;
    }
    o.getInsurancePolicy = function() {
        return this.insurancePolicy;
    }
    o.isInsured = function(){
        return !!this.insurancePolicy;
    }
}

makeInsurable(Car.prototype);
const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy());
