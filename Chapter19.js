//19. 제이쿼리

//제이쿼리는  DOM을 조작, Ajax 요청을 실행할 때 유용한 라이브러리
//장점 : 브라우저 호환성, 제공하는 Ajax API 매우 단순, 내장된 DOM API를 더 유용하고 단순하게 바꾼 메서드 제공


//19.1 맥가이버 나이프, 달러 기호
//자바스크립트에서 달러 기호를 식별자로 쓸 수 있다는 장점을 활용
//제이쿼리를 사용할 때는 jQuery나 $를 씀


//19.2 제이쿼리 불러오기
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>


//19.3 DOM 기다리기
//브라우저가 HTML파일을 읽고, 해석하고, 렌더링하는 과정은 복잡
//제이쿼리는 브라우저가 페이지를 완전히 읽고 DOM을 구축한 다음에만 호출되는 콜백 안에 코드를 작성
$(document).ready(function(){
    //~~~
});
//여러 번 나누어 써도 안전. 모두 DOM을 불러온 뒤에 실행됨.

//단축 표기
$(function() { 
    //~~~
});


//19.4 제이쿼리로 감싼 DOM요소
//제이쿼리로 DOM을 조작할 때 가장 많이 쓰는 방법은 제이쿼리로 DOM요소를 감싸는 방법
//제이쿼리 객체 <- 제이쿼리 함수로 DOM요소 셋을 감싼 것
//제이쿼리 함수를 호출할 때는 CSS선택자나 HTML 사용

//CSS선택자로 제이쿼리 호출 -> 해당 선택자에 일치하는 제이쿼리 객체 반환
const $paras = $('p');
$paras.length;
typeof $paras;
$paras instanceof $;
$paras instanceof jQuery;

//HTML로 제이쿼리 호출 -> 그에 맞는 DOM요소가 새로 만들어짐
const $newPara = $('<p>Newly created paragragh...</p>');


//19.5 요소 조작
//제이쿼리를 사용하면 쉽게 콘텐츠를 추가하거나 제거할 수 있음
//text메서드 - 요소의 textContent 프로퍼티
//html메서드 - 요소의 innerHTML 프로퍼티
$('p').text('ALL PARAGRAPHS REPLACED');
$('p').html('<i>ALL</i> PARAGRAPHS REPLACED');

//세 번째 문단 하나만 바꾸려면 eq메서드 사용해서 요소 하나만 들어있는 새 제이쿼리 객체 만듬
$('p')
    .eq(2)
    .html('<i>THIRD</i> PARAGRAPH REPLACED' );

//요소를 제거할 때는 제이쿼리 객체에서 remove호출
$('p').remove();

//새 콘텐츠 추가
//모든 문단에 각주 표시하기
$('p')
    .append('<sup>*</sup>');

//형제 삽입
//모든 문단의 앞뒤에 <hr>요소 추가
$('p')
    .after('<hr>')
    .before('<hr>');

//삽입할 '요소'에서 호출
$('<sub>*</sub>').appendTo('p');
$('<hr>').insertBefore('p');
$('<hr>').insertAfter('p');

//요소의 스타일 바꾸기
//클래스 추가,삭제,토글 
//css메서드
$('p:odd').css('color', 'red');

//요소의 부분 집합만 남기기
// -filter - set요소 일치 선택자에 맞는 요소만 남도록 선택 범위 줄임 (현재 선택된 요소 전체에 필터 적용)
//문 단 전체를 수정한 다음 filter를 체인으로 연결해 홀수 번째 문단만 빨갛게
$('p')
    .after('<hr>')
    .append('<sub>*</sub>')
    .filter(':odd')
    .css('color', 'red')

// -not -filter의 반대
//모든 문단 다음에 <hr>을 붙이고 highlight클래스가 없는 문단을 모두 들여쓰게
$('p')
    .after('<hr>')
    .not('.highlight')
    .css('margin-left', '20px');

// -find - 주어진 선택자에 일치하는 자손만 남김 (주어진 선택자에 일치하는 자손만 남김)
//모든 문단 앞에 <hr>을 붙인 다음 클래스가 code인 자손 요소의 폰트 크기 키우기
$('p')
    .before('<hr>')
    .find('.code')
    .css('font-size', '30px');


//19.6 제이쿼리 취소
//제이쿼리 객체로 감싼 것을 취소하고 DOM요소에 직접 접근하려면 get메서드 사용
const para2 = $('p').get(1);

const paras = $('p').get();


//19.7 Ajax
//제이쿼리의 Ajax호출을 편하고 세밀하게 컨트롤할 수 있는 메서드 get, post <- 콜백을 지원하기도 하지만 프라미스를 반환하기도 함
//18장에서 만들었던 refreshServerInfo 예제를 get으로 고치면

function refreshServerInfo(){
    const $serverInfo = $('.serverInfo');
    $.get('http://localhost:7070').then(
        function(data){
            Object.keys(data).forEach(p => {
                $(`[data-replace="${p}"]`).text(data[p]);
            });
        },
        function(jqXHR, textStatus, err){
            console.error(err);
            $serverInfo.addClass('error')
                .html(`Error connecting to server.`)
        }
    );
}