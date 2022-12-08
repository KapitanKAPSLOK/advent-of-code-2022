import * as fs from "fs";

class Folder {
  name: string;
  parentFolder?: Folder;
  // Size of all files in the folder (but not in subfolders).
  size: number;
  subFolders: Record<string, Folder>;

  /**
   * Creates the folder with 0 size.
   * @param name folder name
   * @param parentFolder undefined for the root
   */
  constructor(name: string, parentFolder?: Folder) {
    this.name = name;
    this.parentFolder = parentFolder;
    this.size = 0;
    this.subFolders = {};
  }

  /**
   * Returns the size of all files in the folder and its subdirectories.
   * If callback function is provided it is run with total size of current dir
   * and recursively with total sizes for each subfolder.
   */
  public getTotalSize(cb?: (totalSize: number) => void): number {
    const totalSize = Object.values(this.subFolders).reduce(
      (sum: number, folder) => {
        sum += folder.getTotalSize(cb);
        return sum;
      },
      this.size,
    );
    if (cb) cb(totalSize);

    return totalSize;
  }
}

class FileSystem {
  public root = new Folder("/");
  public currentDir = this.root;

  constructor(lines: string[]) {
    lines.forEach((line) => {
      if (line.startsWith("$")) {
        this.parseCommand(line);
      } else {
        this.parseLsOutput(line);
      }
    });
  }

  private parseCommand(line: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, name, arg] = line.split(" ");
    if (name === "ls") return;
    if (name === "cd") {
      if (arg === "..") {
        if (!this.currentDir.parentFolder) {
          throw new Error("Wrong command! Can't go up from the root.");
        }
        this.currentDir = this.currentDir.parentFolder;
      } else if (arg === "/") {
        this.currentDir = this.root;
      } else {
        this.currentDir = this.currentDir.subFolders[arg];
      }
    }
  }

  private parseLsOutput(line: string): void {
    if (line.startsWith("dir")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, dirName] = line.split(" ");
      this.currentDir.subFolders[dirName] = new Folder(
        dirName,
        this.currentDir,
      );
    } else {
      const [fileSize] = line.split(" ");
      this.currentDir.size += +fileSize;
    }
  }
}

const data = fs.readFileSync("./input.txt", "utf-8");
const inputLines = data.split(/\r?\n/);

const fileSystem = new FileSystem(inputLines);

const totalDiskSpace = 70000000;
const requiredSpace = 30000000;
const missingSpace =
  requiredSpace - (totalDiskSpace - fileSystem.root.getTotalSize());

let conditionalSum = 0;
let smallestSizeToDelete = Infinity;

fileSystem.root.getTotalSize((size) => {
  // Part 1
  if (size < 100000) {
    conditionalSum += size;
  }
  // Part 2
  if (size > missingSpace && smallestSizeToDelete > size) {
    smallestSizeToDelete = size;
  }
});

console.log(`Part 1: ${conditionalSum}`);
console.log(`Part 2: ${smallestSizeToDelete}`);
