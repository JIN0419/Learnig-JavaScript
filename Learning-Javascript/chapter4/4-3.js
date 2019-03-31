

while(funds > 1 && funds < 100){
    let totalBet = rand(1,funds);
    if(totalBet === 13){
        console.log("Unlucky! Skip this round....");
    }else{

    }
}

while(funds > 1 && funds < 100){
    let totalBet = rand(1,funds);
    if(totalBet === 13) {
        console.log("Unlucky! Skip this round....");
        continue;
    }
}

/*
let firstPrime = null;
let bigArrayOfNumbers = [1, 2, 3,4 , 5, 6, 7,8,9];
for(let n of bigArrayOfNumbers){
    if(isPrime(n) && firstPrime === null) firstPrime = n;
}


for(let n of bigArrayOfNumbers){
    if(isPrime(n)){
        firstPrime = n;
        break;
    }
}

let i = 0;
for(; i <bigArrayOfNumbers.length;i++){
    if(isPrime(bigArrayOfNumbers[i])) break;
}
if(i=== bigArrayOfNumbers.length) console.log('No prime numbers!');
else console.log(`First prime number found at position ${i}`);

*/