//18 브라우저의 자바스크립트

//18.2 문서 객체 모델
function printDOM(node, prefix){
    console.log(prefix + node.nodeName);
    for(let i=0;i < node.childNodes.length; i++){
        printDOM(node.childNodes[i], prefix + '\t');
    }
}

printDOM(document, '')

//18.3 용어 사용


//18.4 get 메서드
//DOM의 원하는 HTML요소를 빨리 찾을 수 있는 메서드
//- document.getElementById
document.getElementById('content');

//- document.getElementByClassName
const callouts = document.getElementByClassName('callout');

// - document.getElementsByTagName
const paragraphs = document.getElementsByTagName('p');


//18.5 DOM 요소 쿼리
//다른 요소와의 관계를 사용해 요소를 찾는 메서드 - CSS선택자 사용
// - querySelector, querySelectorAll


//18.6 DOM 요소 조작
//모든 요소에는 textContent와 innerHTML 프로퍼티가 있음
//textContent -> HTML 태그를 모두 제고하고 순수한 텍스트 데이터만 제공
//innerHTML ->HTML태그를 그대로 제공 -> 태그를 수정하면 DOM이 그에 맞게 변경됨
const para1 = document.getElementsByTagName('p')[0];
para1.textContent;      //"This is a simple HTML file."
para1.innerHTML;    //"This is a <i>simple</i> HTML file."
para1.textContent = "Modified HTML file";   //"Modified HTML file"
para1.innerHTML = "Modified HTML file";     //"Modified HTML file"


//18.7 새 DOM 요소 만들기
//document.createElement -> 새 노드를 만들 수 있음. DOM에 추가되지는 않음
const p1 = document.createElement('p');
const p2 = document.createElement('p');
p1.textContent = "I was created dynamically!";
p2.textContent = "I was also created dynamically!";

//insertBefore, appendChild -> 새로 만든 요소 DOM에 추가
const parent = document.getElementById('content');  //부모 DOM 요소 찾기
const firstChild = parent.childNodes[0];    //그 첫 번째 자식 찾기
parent.insertBefore(p1, firstChild);    //(삽입할 요소, 삽입할 위치)
parent.appendChild(p2);     //(삽입할 요소) <- 항상 마지막 자식 요소로 추가함


//18.8 요소 스타일링
//요소 프로퍼티를 직접 수정하는 것보다는 CSS클래스를 새로 만들고 그 클래스를 원하는 요소에 지정하는 편이 나음

//CSS 클래스 =============
.highlight{
    background: #ff0;
    font-style: italic;
}
//========================

function highlightParas(containing){
    if(typeof containing === 'string'){
        containing = new RegExp(`\\b${containing}\\b`, 'i');
    }
    const paras = document.getElementsByTagName('p');
    console.log(paras);
    for(let p of paras){
        if(!containing.test(p.textContent)) continue;
        p.classList.add('highlight');
    }
}
highlightParas('unique');

//클래스를 제거할 때는 classList.remove사용
function removeParaHighlights(){
    const paras = document.querySelectorAll('p.highlight');
    for(let p of paras){
        p.classList.remove('highlight');
    }
}


//18.9 데이터 속성

//대괄호 문법을 이용하면 어느 속성으로든 찾을 수 있다.
//querySelectorAll을 사용하면 여러 요소가 한 가지 기능을 하도록 만들 수 있다.
const highlightActions = document.querySelectorAll('[data-action="highlight"]');

//dataset프로퍼티
highlightActions[0].dataset;    //DOMStringMap {action: "highlight", containing: "unique"}

//데이터 속성을 수정, 데이터 추가
highlightActions[0].dataset.containing = "giraffe";
highlightActions[0].dataset.caseSensitive = "true";


//18.10 이벤트

//click이벤트
const highlightActions = document.querySelectorAll('[data-action="highlight"]');
for(let a of highlightActions){
    a.addEventListener('click', evt => {
        evt.preventDefault();
        highlightParas(a.dataset.containing);
    });
}

const removeHighlightActions = document.querySelectorAll('[data-action="removeHighlights"]');
for(let a of removeHighlightActions){
    a.addEventListener('click', evt => {
        evt.preventDefault();
        removeParaHighlights();
    });
}


//18.10.1 이벤트 버블링과 캡쳐링
//캡처링 : 가장 먼 조상부터 시작
//버블링 : 이벤트가 일어난 요소에서 시작해 거슬러 올라가는 방법
//HTML5에서는 가장 먼 조상에서 시작해 해당 요소까지 내려온 다음 다시 가장 먼 조상까지 거슬러 올라가는 방법

//이벤트 핸들러의 다른 핸들러가 어떻게 호출될지 영향을 주는 세 가지 방법 
// preventDefault -> 이벤트 취소, defaultPrevented프로퍼티가 true로 바뀐 채 전달
// stopPropagation -> 해당 요소에 연결된 이벤트 핸들러는 동작, 다른 요소에 연결된 이벤트 핸들러는 동작X
// stopImmediatePropagation -> 다른 핸들러, 현재 요소에 연결된 이벤트 핸들러도 동작하지 않게 막음

//event.html 참고


//18.10.2 이벤트 카테고리


//18.11 Ajax
//Server.js와 simple.html 참고