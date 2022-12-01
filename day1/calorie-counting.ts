import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");

const elfs = data.split(/\r?\n\r?\n/);
const topCalories: number[] = new Array(3).fill(0);

elfs.map((inventory)=>{
    const sumOfCalories = inventory.split(/\r?\n/).reduce((sum, calories) => sum += Number(calories), 0);

    let i = topCalories.length - 1;
    while(sumOfCalories > topCalories[i]) {
        --i;
        if(i < 0) break;
    }
    ++i;

    if(i < topCalories.length - 1) {
        for(let j = topCalories.length - 1; j > i; --j) {
            topCalories[j] = topCalories[j - 1];
        }
        topCalories[i] = sumOfCalories;
    }
});

console.log(`Part 1: ${topCalories[0]}`)
console.log(`Part 2: ${topCalories.reduce((sum, calories) => sum += calories)}`);

