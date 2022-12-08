import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");
const rows = data.split(/\r?\n/);

// Part 1
const visibilityGrid: boolean[][] = new Array<boolean[]>(rows.length);
const treesInRow = rows[0].length;
for (let i = 0; i < visibilityGrid.length; ++i) {
  visibilityGrid[i] = new Array<boolean>(treesInRow).fill(false);
}

/**
 * First, I go from left to right for each row and mark all trees seen from the outside of the grid.
 */
for (let i = 0; i < rows.length; ++i) {
  // Table of indexes when a tree with a given height (0-9) first occurred from the right.
  const firstOccurrenceFromRight: number[] = new Array(10);
  // I keep track of the highest tree from the left so far.
  let maxHeightFromLeft = -1;
  for (let j = 0; j < rows[i].length; ++j) {
    const treeHeight = +rows[i][j];
    if (maxHeightFromLeft < treeHeight) {
      visibilityGrid[i][j] = true;
      maxHeightFromLeft = treeHeight;
    }
    firstOccurrenceFromRight[treeHeight] = j;
  }
  /**
   * There are at most 10 trees visible from the right.
   * Only the first occurrence of a tree with a given hight is important because
   * other trees with the the same height won't be visible.
   */
  firstOccurrenceFromRight.reduceRight((maxIndex, currentIndex) => {
    if (currentIndex > maxIndex) {
      visibilityGrid[i][currentIndex] = true;
      maxIndex = currentIndex;
    }
    return maxIndex;
  }, -1);
}

// The same process as above but from the top to the bottom for each column.
for (let i = 0; i < rows[0].length; ++i) {
  const firstOccurrenceFromBottom: number[] = new Array(10);
  let maxHeightFromTop = -1;
  for (let j = 0; j < rows.length; ++j) {
    const treeHeight = +rows[j][i];
    if (maxHeightFromTop < treeHeight) {
      visibilityGrid[j][i] = true;
      maxHeightFromTop = treeHeight;
    }
    firstOccurrenceFromBottom[treeHeight] = j;
  }
  firstOccurrenceFromBottom.reduceRight((maxIndex, currentIndex) => {
    if (currentIndex > maxIndex) {
      visibilityGrid[currentIndex][i] = true;
      maxIndex = currentIndex;
    }
    return maxIndex;
  }, -1);
}

let visibleTrees = 0;
for (const rows of visibilityGrid) {
  for (const isVisible of rows) {
    if (isVisible) {
      visibleTrees++;
    }
  }
}

// Part 2
let maxScenicScore = 0;
/**
 * I simply go through all trees (except the edges) and calculate the view distance in each direction.
 */
for (let i = 1; i < rows.length - 1; ++i) {
  for (let j = 1; j < rows[i].length - 1; ++j) {
    const treeHeight = +rows[i][j];

    let viewDistanceRight = 0;
    let k = j + 1;
    while (k < rows[i].length) {
      viewDistanceRight++;
      if (+rows[i][k++] >= treeHeight) break;
    }

    let viewDistanceLeft = 0;
    k = j - 1;
    while (k >= 0) {
      viewDistanceLeft++;
      if (+rows[i][k--] >= treeHeight) break;
    }

    let viewDistanceBottom = 0;
    k = i + 1;
    while (k < rows.length) {
      viewDistanceBottom++;
      if (+rows[k++][j] >= treeHeight) break;
    }

    let viewDistanceTop = 0;
    k = i - 1;
    while (k >= 0) {
      viewDistanceTop++;
      if (+rows[k--][j] >= treeHeight) break;
    }

    const scenicScore =
      viewDistanceBottom *
      viewDistanceLeft *
      viewDistanceRight *
      viewDistanceTop;
    if (scenicScore > maxScenicScore) maxScenicScore = scenicScore;
  }
}

console.log(`Part 1: ${visibleTrees}`);
console.log(`Part 2: ${maxScenicScore}`);
