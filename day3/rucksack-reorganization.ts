import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");
const rucksacks = data.split(/\r?\n/);

let prioritiesSumA = 0;
let prioritiesSumB = 0;

const groupItems1 = new Set<string>();
const groupItems2 = new Set<string>();
rucksacks.map((rucksack, rucksackNr) => {
  // Part 1
  const compartment = new Set<string>();
  for (let i = 0; i < rucksack.length / 2; ++i) {
    compartment.add(rucksack[i]);
  }
  const duplicatedItems = new Set<string>();
  for (let i = rucksack.length / 2; i < rucksack.length; ++i) {
    if (compartment.has(rucksack[i])) {
      if (!duplicatedItems.has(rucksack[i])) {
        prioritiesSumA += charToPriority(rucksack[i]);
        duplicatedItems.add(rucksack[i]);
      }
    }
  }

  // Part 2
  if (rucksackNr % 3 === 0) {
    groupItems1.clear();
    for (let i = 0; i < rucksack.length; ++i) {
      groupItems1.add(rucksack[i]);
    }
  } else if (rucksackNr % 3 === 1) {
    groupItems2.clear();
    for (let i = 0; i < rucksack.length; ++i) {
      if (groupItems1.has(rucksack[i])) {
        groupItems2.add(rucksack[i]);
      }
    }
  } else {
    for (let i = 0; i < rucksack.length; ++i) {
      if (groupItems2.has(rucksack[i])) {
        prioritiesSumB += charToPriority(rucksack[i]);
        break;
      }
    }
  }
});

function charToPriority(x: string): number {
  const asciiCode = x.charCodeAt(0);
  if (asciiCode < 97) {
    return asciiCode - "A".charCodeAt(0) + 27;
  } else {
    return asciiCode - "a".charCodeAt(0) + 1;
  }
}

console.log(`Part 1: ${prioritiesSumA}`);
console.log(`Part 2: ${prioritiesSumB}`);
