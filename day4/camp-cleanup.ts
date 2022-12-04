import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");
const pairs = data.split(/\r?\n/);

let fullyOverlappedSections = 0;
let overlappedSections = 0;
pairs.map((pair) => {
  const [elf1, elf2] = pair
    .split(",")
    .map((range) => range.split("-").map((str) => Number(str)));

  // Part 1
  if (
    (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) ||
    (elf2[0] <= elf1[0] && elf2[1] >= elf1[1])
  ) {
    fullyOverlappedSections += 1;
  }

  // Part 2
  if (elf1[0] <= elf2[1] && elf1[1] >= elf2[0]) {
    overlappedSections += 1;
  }
});

console.log(`Part 1: ${fullyOverlappedSections}`);
console.log(`Part 2: ${overlappedSections}`);
