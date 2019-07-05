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
arr.concat(4,5,6);


//