
/////for

/*
for(let temp, i = 0, j = 1; j < 30 ; temp = i, i = j, j = i + temp){
    console.log(j);
}
*/
/*
let s = '3';
for( ; s.length < 10 ; s = ' ' + s);

for(let x = 0.2 ; x < 3.0 ; x += 0.2){
    console.log(x);
}

for( ; !player.isBroke;){
    console.log("Still playing!");
}

*/

///////switch
/*
switch(totalBet){
    case 7:
        totalBet = funds;
        break;
    case 13:
        funds = funds -1;   //의도적으로 break문이 없음.
    case 11:
        totalBet =0;
        break;
    case 21:
        totalBet = 21;
        break;
}
*/
/*
switch(totalBet){
    case 7:
        totalBet = funds;
        break;
    case 13:
        funds = funds -1;   //의도적으로 break문이 없음.
    case 11:
        totalBet =0;
        break;
    case 21:
        totalBet = 21;
        break;
    default:         //일치하는 case절이 없을 때 실행됌. 필수는 아니지만 보통 마지막에 배치.
        console.log("No superstition here!");
        break;
}
*/

/*
//switch문을 함수 안에서 쓸 때는 return문이 있으므로 break문 대신 쓸 수 있다.
function adjustBet(totalBet, funds) {
    switch(totalBet){
        case 7:
            return funds;
        case 13:
            return 0;
        default:
            return totalBet;
    }
}
*/
/*
switch(totalBet){
    case 7: totalBet = funds; break;
    case 11: totalBet = 0;    break;
    case 13: totalBet = 0;    break;
    case 21: totalBet = 21;   break;
}
*/
/*
const player = { name: 'Thomas', rank: 'Midshipman', age: 25};

for(let prop in player) {
    if(!player.hasOwnProperty(prop))
        continue;
    console.log(prop + ':' + player[prop]);
}
*/


function rand(m,n){ //m부터 n사이 정수 랜덤 생성하는 함수
    return m + Math.floor( (n - m + 1)*Math.random() );
}

function randFace(){ //카드 랜덤 생성하는 함수
    return ["crown", "anchor", "heart", "spade", "club", "diamond"][rand(0,5)];
}

const hand = [randFace(),randFace(),randFace()];
for(let face of hand)
    console.log(`You rolled...${face}!`);


for(let i = 0; i <hand.length ; i++){
    console.log(`Roll ${i+1}: ${hand[i]}`);
}
