
function rand(m,n){ //m부터 n사이 정수 랜덤 생성하는 함수
    return m + Math.floor( (n - m + 1)*Math.random() );
}

function randFace(){ //카드 랜덤 생성하는 함수
    return ["crown", "anchor", "heart", "spade", "club", "diamond"][rand(0,5)];
}


let funds = 50; //50펜스를 갖고 시작한다.

let round = 0;

while(funds > 1 && funds < 100){ //돈을 100따거나 전부 잃을 때까지 반복
    round++;
    console.log(`round ${round}:`);
    console.log(`\tstarting funds: ${funds}p`);

    const bets = { crown: 0, anchor:0, heart:0, spade:0, club:0, diamond:0 };   //////돈 걸기 시작

    let totalBet = rand(1, funds);  //주머니에 손을 넣고 돈이 집히는 만큼(랜덤)
    if(totalBet === 7){ //만약 우연히 7펜스가 나오면
        totalBet = funds;   //돈 전부를 하트에 건다.
        bets.heart = totalBet;
    }else{                  //집은 돈의 액수가 7펜스가 아니면 그 돈의 무작위 액수를 무작위 카트에 건다.
        let remaining = totalBet;
        do {
            let bet = rand(1, remaining);   //아까 집은 돈에서 또 랜덤
            let face = randFace();          //카드 랜덤
            bets[face] = bets[face] + bet;   //랜덤으로 뽑힌 카드에 랜덤으로 뽑은 액수를 건다
            remaining = remaining - bet;    //아까 집은 돈에서 방금 건 돈을 뺀다
        }while(remaining > 0);          //아까 집은 돈이 없어질 때 까지 반복
    }
    funds = funds - totalBet;       //내가 갖은 돈에서 아까 집은 돈을 뺀다.

    console.log(`\tbets: `+ Object.keys(bets).map(face => `${face} ${bets[face]} pence`).join(',') + `(total: ${totalBet} pence)` );


    const hand = []; //주사위 결과를 담을 배열                                    //////주사위 굴리기
    for(let roll = 0; roll < 3; roll++){   //주사위를 세 번 굴린다
        hand.push(randFace());      //랜덤 생성
    }
    console.log(`\thand: ${hand.join(',')}`);


    let winnings = 0;                                                         //////딴 돈 가져오기
    for(let die = 0; die < hand.length; die++){
        let face = hand[die];       //주사위를 굴려 나온 카드들에 돈을 건 카드가 있는지 확인
        if(bets[face] > 0){
            winnings = winnings + bets[face];
        }
    }
    funds = funds + winnings;

    console.log(`\twinnings: ${winnings}`);
}

console.log(`\tending funds: ${funds}`);