import * as fs from "fs";

/**
 * If true prints the rope after each step on a grid of the size GRID_SIZE x GRID_SIZE.
 * It's only useful for smaller inputs like examples from the problem.
 */
const PRINT_ROPE = false;
const GRID_SIZE = 40;

const data = fs.readFileSync("./input.txt", "utf-8");
const moves = data.split(/\r?\n/);

type Coordinates = {
  x: number;
  y: number;
};

class RopeHead {
  private _x = 0;
  private _y = 0;

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public move(direction: string, distance: number) {
    switch (direction) {
      case "R":
        this._y += distance;
        break;
      case "L":
        this._y -= distance;
        break;
      case "U":
        this._x += distance;
        break;
      case "D":
        this._x -= distance;
        break;
      default:
        throw new Error(`Unknown direction: ${direction}.`);
    }
  }
}

const head = new RopeHead();
// Set of stringified visited coordinates.
const visitedLocationsA = new Set<string>();
const visitedLocationsB = new Set<string>();

const knots = new Array<Coordinates>(9);
for (let i = 0; i < knots.length; ++i) {
  knots[i] = { x: 0, y: 0 };
}
visitedLocationsA.add(JSON.stringify(knots.at(0)));
visitedLocationsB.add(JSON.stringify(knots.at(-1)));

for (const move of moves) {
  const [direction, distance] = move.split(" ");

  for (let i = 0; i < +distance; ++i) {
    let knotToFollow: Coordinates = head;
    head.move(direction, 1);
    for (const knot of knots) {
      if (knotToFollow.x - knot.x > 1) {
        knot.x++;
        knot.y += Math.sign(knotToFollow.y - knot.y);
      } else if (knotToFollow.x - knot.x < -1) {
        knot.x--;
        knot.y += Math.sign(knotToFollow.y - knot.y);
      } else if (knotToFollow.y - knot.y > 1) {
        knot.y++;
        knot.x += Math.sign(knotToFollow.x - knot.x);
      } else if (knotToFollow.y - knot.y < -1) {
        knot.y--;
        knot.x += Math.sign(knotToFollow.x - knot.x);
      }

      if (knot === knots.at(0)) visitedLocationsA.add(JSON.stringify(knot));
      if (knot === knots.at(-1)) visitedLocationsB.add(JSON.stringify(knot));

      knotToFollow = knot;
    }

    // Simple printing code, not needed for the solution.
    if (PRINT_ROPE) {
      const startingPosition = GRID_SIZE / 2;
      const grid: string[][] = new Array(GRID_SIZE);
      for (let i = 0; i < GRID_SIZE; ++i) {
        grid[i] = new Array(GRID_SIZE).fill(".");
      }
      for (let i = knots.length - 1; i >= 0; --i) {
        const knot = knots[i];
        grid[startingPosition + knot.x][startingPosition + knot.y] = (
          i + 1
        ).toString();
      }
      grid[startingPosition + head.x][startingPosition + head.y] = "H";

      console.log("\n");
      for (const row of grid.reverse()) {
        console.log(row.join(""));
      }
    }
  }
}

console.log(`Part 1: ${visitedLocationsA.size}`);
console.log(`Part 2: ${visitedLocationsB.size}`);
