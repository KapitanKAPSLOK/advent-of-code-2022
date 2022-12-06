import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");

function findStartOfPacket(data: string, diffCharsRequired: number) {
  let differentChars = 1;
  for (let i = 1; i < data.length; ++i) {
    let j = 1;
    for (; j <= differentChars; ++j) {
      if (data[i - j] === data[i]) {
        break;
      }
    }
    differentChars = j;
    if (differentChars === diffCharsRequired) {
      return i + 1;
    }
  }
}

console.log(`Part 1: ${findStartOfPacket(data, 4)}`);
console.log(`Part 2: ${findStartOfPacket(data, 14)}`);
