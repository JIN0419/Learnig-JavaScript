//맵과 셋

//10.1 Map
//키와 값을 연결할 목적에 유용. 

//예제: 여러 개의 객체에 각각 역할 부여
const u1 = {name: 'Cynthia'};
const u2 = {name: 'Jackson'};
const u3 = {name: 'Olive'};
const u4 = {name: 'James'};

const userRoles = new Map(); //맵을 만듬

userRoles
    .set(u1, 'User')
    .set(u2, 'User')
    .set(u3, 'Admin');      //맵의 set() 메서드를 사용하여 역할 할당

//u2의 역할을 알아보기 위해 get()메서드 사용
userRoles.get(u2);      //"User"

//맵에 키가 존제하는지 확인하기 위해 has()메서드 사용
userRoles.has(u1);  //true
userRoles.get(u1);  //"User"
userRoles.has(u4);  //false
userRoles.get(u4);  //undefined

//맵에 이미 존재하는 키에 값을 교체하기 위해 set()
console.log(userRoles.get(u1));     //User
userRoles.set(u1, 'Admin'); 
console.log(userRoles.get(u1));     //Admin

//size 프로퍼티 : 맵의 요소 숫자 반환
userRoles.size;     //3

//keys()->키, values()->값, entries()->[키,값] 반환값 모두 이터러블 객체임
for(let u of userRoles.keys()){
    console.log(u.name);
}
for(let r of userRoles.values()){
    console.log(r);
}
for(let ur of userRoles.entries()){
    console.log(`${ur[0].name}: ${ur[1]}`);
}
for(let [u,r] of userRoles.entries()){
    console.log(`${u.name}: ${r}`);
}
for(let [u,r] of userRoles){    //entries()메서드는 맵의 기본 이터레이터임
    console.log(`${u.name}: ${r}`)
}

//이터러블 객체보다 배열이 필요하면 확산연산자 사용
[...userRoles.values()];    //(3) ["Admin", "User", "Admin"]

//맵의 요소를 지울 때는 delete()메서드 사용
userRoles.delete(u2);
userRoles.size;     //2

//맵의 요소를 모두 지울 때는 clear() 메서드 사용
userRoles.clear();
userRoles.size;     //0


//10.2 WeakMap
//Map과의 차이점 :
// -키가 반드시 객체여야함.
// -키는 가지비 컬렉션에 포함될 수 있음
// -이터러블이 아님. 
// -clear()메서드 없음.
const SecretHolder = (function() {
    const secrets = new WeakMap();
    return class{
        setSecret(secret){
            secrets.set(this, secret);
        }
        getSecret(){
            return secrets.get(this);
        }
    }
})();

const a = new SecretHolder();
const b = new SecretHolder();
a.setSecret('secret A');
b.setSecret('secret B');
a.getSecret();      //"secret A"
b.getSecret();      //"secret B"


//10.3 Set
//중복을 허용하지 않는 데이터 집합.

//예제. 한 사용자에게 여러 역할을 할당
const roles = new Set(); //Set인스턴스를 만듬

//사용자 역할 추가하기 위해 add()메서드 사용
roles.add("User");      //Set(1) {"User"}

//관리자 역할 추가힉 위해 add() 다시 호출
roles.add("Admin");     //Set(2) {"User", "Admin"}

//Map처럼 size 프로퍼티 존재
roles.size;     //2

//추가하려는 것이 Set에 이미 있으면 확인할 필요 없이 아무일도 일어나지 않음.
roles.add("User");      //Set(2) {"User", "Admin"}
roles.size;     //2

//제거하기 위해 delete(). 제거하려는 것이 Set에 존재하여 제거에 성공했으면 true 반환, 그렇지 않으면 false반환
roles.delete("Admin");     //true
roles;                      //Set(1) {"User"}
roles.delete("Admin");      //false


//10.4 WeakSet
//객체만 포함되며 가비지 콜렉션의 대상이 됨.
//이터러블이 아니기 때문에 용도가 적고 주어진 객체가 셋 안에 존재하는지 아닌지를 알아보는 것뿐으로 사용
const naughty = new WeakSet();

const children = [
    { name : "Suzy"},
    { name : "Derek"},
];

naughty.add(children[1]);

for(let child of children){
    if(naughty.has(child)){
        console.log(`Coal for ${child.name}!`);
    }else{
        console.log(`Presents for ${child.name}!`);
    }
} //Presents for Suzy!
  //Coal for Derek!

  