import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");
const commands = data.split(/\r?\n/);

// Register X value.
let x = 1;
const simulationLength = 240;
// Argument of the add operation in progress.
let addInProgress: number | null = null;
let commandLineNr = 0;
let CRTPosition = 0;
let messageToPrint = "";
let totalSignalStrength = 0;
for (let i = 1; i <= simulationLength; ++i) {
  // Part 1
  if (i % 40 === 20) {
    totalSignalStrength += i * x;
  }

  // Part 2
  if (Math.abs(CRTPosition - x) <= 1) {
    messageToPrint += "#";
  } else {
    messageToPrint += ".";
  }
  if (++CRTPosition > 39) {
    messageToPrint += "\n";
    CRTPosition = 0;
  }

  // Commands processing.
  if (addInProgress !== null) {
    x += addInProgress;
    addInProgress = null;
  } else {
    const [cmdName, arg] = commands[commandLineNr++].split(" ");
    if (cmdName === "addx") {
      addInProgress = +arg;
    }
  }
}

console.log(`Part 1: ${totalSignalStrength}`);
console.log(`Part 2: \n${messageToPrint}`);
