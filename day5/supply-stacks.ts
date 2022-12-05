import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");
const [cratesInput, movesInput] = data.split(/\r?\n\r?\n/);

const cratesInputLines = cratesInput.split(/\r?\n/);
const crates: string[][] = [];
for (let i = 0; i < cratesInputLines[0].length / 4; ++i) {
  crates.push([]);
}

cratesInputLines.slice(0, -1).forEach((line) => {
  crates.map((crate, i) => {
    const item = line[4 * i + 1];
    if (item != " ") {
      crate.push(item);
    }
  });
});

const cratesA = crates;
const cratesB: string[][] = JSON.parse(JSON.stringify(crates));

movesInput.split(/\r?\n/).map((move) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, howMany, __, from, ___, to] = move.split(" ");

  // Part 1
  const movedElementsA = cratesA[+from - 1].splice(0, +howMany);
  cratesA[+to - 1].splice(0, 0, ...movedElementsA.reverse());

  // Part 2
  const movedElementsB = cratesB[+from - 1].splice(0, +howMany);
  cratesB[+to - 1].splice(0, 0, ...movedElementsB);
});

console.log(`Part 1: ${getTopCrates(cratesA)}`);
console.log(`Part 2: ${getTopCrates(cratesB)}`);

function getTopCrates(cratesStack: string[][]) {
  return cratesStack.reduce((result, crate) => (result += crate[0]), "");
}
