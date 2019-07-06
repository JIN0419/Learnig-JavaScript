//배열과 배열 처리

//8.1 배열의 기초 ==========================
const arr1 = [1,2,3];



//8.2배열 요소 조작=========================

//(수정)
//push,pop은 배열의 끝에 추가,제거
//unshift,shift는 배열의 처음에 추가,제거
//push와 unshift는 늘어난 길이를 반환, pop과 shift는 제거된 요소를 반환
const arr = ["b","c","d"];
arr.push("e");
arr.pop();
arr.unshift("a");
arr.shift();

//(사본)
//concat은 배열의 끝에 여러 요소를 추가한 사본을 반환.
const arr=[1,2,3];
console.log(arr.concat(4,5,6));     //(6) [1, 2, 3, 4, 5, 6]
console.log(arr);                   //(3) [1, 2, 3]
console.log(arr.concat([4,5,6]));   //(6) [1, 2, 3, 4, 5, 6]
console.log(arr);                   //(3) [1, 2, 3]
console.log(arr.concat([4,5],6));   //(6) [1, 2, 3, 4, 5, 6]
console.log(arr);                   //(3) [1, 2, 3]
console.log(arr.concat([4,[5,6]])); //(5) [1, 2, 3, 4, Array(2)]
console.log(arr);                   //(3) [1, 2, 3]


//(사본)
//slice는 배열의 일부를 가져옴. slice(가져오기 시작할 인덱스, 가져오기 끝날 인덱스 + 1(생략하면 배열의 마지막까지) )
const arr=[1,2,3,4,5];
console.log(arr.slice(3));          //(2) [4, 5]
console.log(arr);                   //(5) [1, 2, 3, 4, 5]
console.log(arr.slice(2,4));        //(2) [3, 4]
console.log(arr);                   //(5) [1, 2, 3, 4, 5]
console.log(arr.slice(-2));         //(2) [4, 5]
console.log(arr);                   //(5) [1, 2, 3, 4, 5]
console.log(arr.slice(1,-2));       //(2) [2, 3]
console.log(arr);                   //(5) [1, 2, 3, 4, 5]
console.log(arr.slice(-2,-1));      //[4]
console.log(arr);                   //(5) [1, 2, 3, 4, 5]


//(수정)
//splice는 배열을 자유롭게 수정. splice(수정을 시작할 인덱스, 제거할 요소의 수, 배열에 추가될 요소)
const arr = [1,5,7];
console.log(arr.splice(1,0,2,3,4)); //[]
console.log(arr);                   //(6) [1, 2, 3, 4, 5, 7]
console.log(arr.splice(5,0,6));     //[]
console.log(arr);                   //(7) [1, 2, 3, 4, 5, 6, 7]
console.log(arr.splice(1,2));       //(2) [2, 3]
console.log(arr);                   //(5) [1, 4, 5, 6, 7]
console.log(arr.splice(2,1,'a','b')); //[5]
console.log(arr);                   //(6) [1, 4, "a", "b", 6, 7]


//(수정)
//fill은 정해진 값으로 배열을 채움. fill(채울 값, (처음 인덱스),(끝 인덱스 + 1))
const arr = new Array(5).fill(1);  
console.log(arr);               //(5) [1, 1, 1, 1, 1]
console.log(arr.fill("a"));     //(5) ["a", "a", "a", "a", "a"]
console.log(arr);               //(5) ["a", "a", "a", "a", "a"]
console.log(arr.fill("b",1));   //(5) ["a", "b", "b", "b", "b"]
console.log(arr);               //(5) ["a", "b", "b", "b", "b"]
console.log(arr.fill("c",2,4)); //(5) ["a", "b", "c", "c", "b"]
console.log(arr);               //(5) ["a", "b", "c", "c", "b"]
console.log(arr.fill(5.5, -4)); //(5) ["a", 5.5, 5.5, 5.5, 5.5]
console.log(arr);               //(5) ["a", 5.5, 5.5, 5.5, 5.5]
console.log(arr.fill(0,-3,-1)); //(5) ["a", 5.5, 0, 0, 5.5]
console.log(arr);               //(5) ["a", 5.5, 0, 0, 5.5]


//(수정)
//reverse는 배열 요소의 순서를 반대로 바꿈.
const arr = [1,2,3,4,5];
console.log(arr.reverse());     //(5) [5, 4, 3, 2, 1]
console.log(arr);               //(5) [5, 4, 3, 2, 1]


//(수정)
//sort는 배열 요소의 순서를 정렬
const arr = [5,4,3,2,1];
console.log(arr.sort());        //(5) [1, 2, 3, 4, 5]
console.log(arr);               //(5) [1, 2, 3, 4, 5]

//정렬 함수를 받을 수 있음. ==> 실행 결과 확인이 안됨..
const arr = [{ name: "Suzanne"}, {name:"Jim"}, {name: "Trevor"}, {name:"Amanda"}];
console.log(arr.sort()); //[{name: "Suzanne"}, {name: "Jim"}, {name: "Trevor"}, {name: "Amanda"}]
console.log(arr.sort( (a,b) => a.name>b.name) );    //위와 같음
console.log(arr.sort( (a,b) => a.name[1]<b.name[1]) );  //위와 같음



//8.3 배열 검색==========================================

//indexOf, lastIndexOf
const o = { name:"Jerry"};
const arr = [1,5,"a", o, true, 5, [1,2], "9"];
console.log(arr.indexOf(5));            //1
console.log(arr.lastIndexOf(5));        //5
console.log(arr.indexOf("a"));          //2
console.log(arr.lastIndexOf("a"));      //2
console.log(arr.indexOf({name:"Jerry"}));   //-1
console.log(arr.indexOf(o));            //3
console.log(arr.indexOf([1,2]));        //-1
console.log(arr.indexOf("9"));          //7
console.log(arr.indexOf(9));            //-1 

//findIndex 보조함수를 써서 검색 조건 지정 가능. 검색 시작 인덱스 지정X
const arr = [{id:5, name:"Judith"}, {id:7, name:"Francis"}];
arr.findIndex( o=> o.id===5);   //0
arr.findIndex( o => o.name === "Francis");  //1
arr.findIndex(o=> o===3);           //-1
arr.findIndex(o=> o.id === 17);        //-1

//find 조건에 맞는 요소의 인덱스가 아니라 요소 자체를 원할 때. 검색 조건을 함수로 전달 가능
const arr = [{id:5, name:"Judith"}];
arr.find(o=> o.id ===5); //{id: 5, name: "Judith"}
arr.find(o=> o.id ===2); //undefined

//find와 findIndex에 전달하는 함수는 배열의 각 요소를 첫번째 매개변수로 받고, 현재 요소의 인덱스, 배열 자체도 매개변수로 받음.
//특정 인덱스보다 뒤에 있는 제곱수를 찾는 예제.
const arr = [1,17,16,5,4,16,10,3,49];
arr.find((X,i) => i>2 && Number.isInteger(Math.sqrt(x)));

//find와 findIndex에 전달하는 함수의 this도 수정 가능. -> 함수가 객체의 메서드인 것처럼 호출 가능.
class Person{
    constructor(name){
        this.name = name;
        this.id = Person.nextId++;
    }
}
Person.nextId = 0;
const jamie = new Person("Jamie"), juliet = new Person("juliet"), peter = new Person("Peter"), jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];
//방법1. 직접 비교
arr.find(p=> p.id === juliet.id);
//방법1. "this"매개변수 이용
arr.find(function (p){
    return p.id === this.id
}, juliet);


//some 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true를 반환, 찾지 못하면 false반환
 const arr = [5,7,12,15,17];
 arr.some(x => x%2===0);
 arr.some(x => Number.isInteger(Math.sqrt(x)));

//every 배열의 모든 요소가 조건에 맞으면 true 반환, 조건에 맞지 않는 요소를 찾아야만 검색을 멈추고 false반환
const arr = [4,6,16,36];
arr.every( x => x%2===0);
arr.every( x => Number.isInteger(Math.sqrt(x)));


//8.4 map, filter ========================================

//(사본)
//map은 배열 요소를 변형. 
const cart = [{name:"Widget", price:9.95}, {name: "Gadget", price: 22.95}];
const names = cart.map( x => x.name);               //(2) ["Widget", "Gadget"]
const prices = cart.map( x => x.price);             //(2) [9.95, 22.95]
const discountPrices = prices.map( x => x*0.8);     //(2) [7.96, 18.36]
console.log( cart, names, prices, discountPrices);

//두 배열에 상품과 가격이 따로 저장되어 있는 것을 객체로 결합
const items = ["Widget", "Gadget"];
const prices = [9.95, 22.95];
const cart = items.map((x,i) => ({name:x, price:prices[i]}));
console.log(cart); //(2) 0: {name: "Widget", price: 9.95} 1: {name: "Gadget", price: 22.95}

//(사본)
//filter 배열에서 필요한 것들만 남김.
const cards = [];
for(let suit of ['H',"C","D","S"]){
    for(let value = 1; value <= 13; value++){
        cards.push({ suit, value });
    }
}
//value가 2인 카드
cards.filter(c => c.value ===2); //(4) [{…}, {…}, {…}, {…}]
                                //0: {suit: "H", value: 2}
                                //1: {suit: "C", value: 2}
                                //2: {suit: "D", value: 2}
                                //3: {suit: "S", value: 2}
//다이아몬드
cards.filter( c => c.suit ==='D');
//킹, 퀸, 주니어
cards.filter( c => c.value>10);
//하트의 킹, 퀸, 주니어
cards.filter(c => c.value>10&& c.suit==='H');
 

//8.5 배열의 바법 reduce =======================================

//(수정)
//reduce 각 요소가 아닌, 배열 자체를 변형.
//map과 filter처럼 콜백함수를 받지만 다른 점은 첫 번째 배개변수는 배열이 줄어드는 대상인 어큐뮬레이터.
const arr = [5,7,2,4];
const sum = arr.reduce((a,x) => a += x, 0);
console.log(sum);

//어큐뮬레이터의 초기값이 제공되지 않는 경우.(첫번째 배열요소를 초기값으로 보고 두번째 요소부터 함수 호출)
const arr = [5,7,2,4];
const sum = arr.reduce((a,x) => a += x);
console.log(sum);

//숫자, 문자열 같은 원시 값이 아니라 객체를 누적값으로 사용할 경우 다양하게 활용 가능.
//예제1. 영단어 첫 글자에 따라 묶기
const words = ["Beach", "Rodeo", "Angel", "Aard","Xylo","Nov","Cho","Papa","Uni","Jok","Clo","Bal"];
const alphabetical = words.reduce((a,x)=>{
  if( !a[x[0]]){
      a[x[0]] = [];
  }
  a[x[0]].push(x);
  return a;
}, {});
console.log(alphabetical); // {A: (2) ["Angel", "Aard"]
                            //B: (2) ["Beach", "Bal"]
                            //C: (2) ["Cho", "Clo"]
                            //J: ["Jok"]
                            //N: ["Nov"]
                            //P: ["Papa"]
                            //R: ["Rodeo"]
                            //U: ["Uni"]
                            //X: ["Xylo"]}

//예제2. 데이터 셋의 평균과 분산을 계산
const data = [3.3, 5, 7.2, 12, 4, 6, 10.3];
const stats = data.reduce((a,x)=>{
    a.N++;
    let delta = x-a.mean;
    a.mean += delta/a.N;
    a.M2 += delta*(x-a.mean);
    return a;
},{ N:0, mean:0, M2: 0});
if(stats.N > 2){
    stats.variance = stats.M2/(stats.N-1);
    stats.stdev = Math.sqrt(stats.variance);
}
console.log(stats); //{N: 7, mean: 6.828571428571428, M2: 63.41428571428572, variance: 10.56904761904762, stdev: 3.2510071699471257}

//예제3. 문자열 누적값을 써서 4글자가 넘는 단어를 모아 문자열 하나로 만듬.
const words = ["Beach", "Rodeo", "Angel", "Aard","Xylo","Nov","Cho","Papa","Uni","Jok","Clo","Bal"];
const longWords = words.reduce((a,w) => w.length>4 ? a+" "+w : a, "").trim();
console.log(longWords); //Beach Rodeo Angel


//8.6삭제되거나 정의되지 않은 요소들 ===========================================

//map,filter,reduce는 삭제되거나 정의되지 않은 요소들에서 콜백함수를 호출하지 않음.
const arr = Array(10).map(function(x) {return 5});
console.log(arr); //(10) [empty × 10]

//배열 중간의 요소를 삭제하고 map을 호출하면 배열 가운데 '구멍'이 생김.
const arr = [1,2,3,4,5];
delete arr[2];
arr.map( x=>0 );    //(5) [0, 0, empty, 0, 0]


//8.7 문자열 병합 ==============================================================

//Array.prototype.join 매개변수로 구분자(생략시 기본값은 쉼표). 요소들을 하나로 합친 문자열을 반환.
const arr = [1, null, "hello", "world", true, undefined];
delete arr[3];      //(6) [1, null, "hello", empty, true, undefined]
arr.join();         //"1,,hello,,true,"
arr.join('');       //"1hellotrue"
arr.join(' -- ');   //"1 --  -- hello --  -- true -- "

//문자열 병합과 Array.prototype.join을 함께 쓸 때 활용 예제
const attributes = ["Nimble", "Perceptive", "Generous"];
const html = '<ul><li>' + attributes.join('</li><li>') + '</li><ul>';
console.log(html);  //<ul><li>Nimble</li><li>Perceptive</li><li>Generous</li><ul>

