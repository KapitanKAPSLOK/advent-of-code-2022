import * as fs from "fs";

function choiceToNumber(x: string): number {
    if( x==="A" || x === "X" ) return 0;
    if( x==="B" || x === "Y" ) return 1;
    if( x==="C" || x === "Z" ) return 2;
    throw new Error("Wrong input!");
}

const data = fs.readFileSync("./input.txt", "utf-8");
const rounds = data.split(/\r?\n/);

let pointsA = 0;
let pointsB = 0;
rounds.map((round)=>{
    const [opponentChoise, myChoise] = round.split(" ");
    pointsA += choiceToNumber(myChoise) + 1;

    const result = (choiceToNumber(myChoise) - (choiceToNumber(opponentChoise)) % 3 + 3) % 3
    if(result === 0) pointsA += 3;
    if(result === 1) pointsA += 6;
    // result === 2 means we lost.

    if(myChoise === "X") {
        pointsB += (choiceToNumber(opponentChoise) + 2) % 3 + 1;
    } else if(myChoise === "Y") {
        pointsB += 3;
        pointsB += choiceToNumber(opponentChoise) + 1;
    } else if(myChoise === "Z") {
        pointsB += 6;
        pointsB += (choiceToNumber(opponentChoise) + 1) % 3 + 1;
    }
});

console.log(`Part 1: ${pointsA}`);
console.log(`Part 2: ${pointsB}`);
