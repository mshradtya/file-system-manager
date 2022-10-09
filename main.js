const fs = require("fs");
const path = require("path");

let inputArr = process.argv.slice(2);
let command = inputArr[0];

const categories = {
  media: [".mp4", ".mkv"],
  archives: [".zip", ".7z", ".rar", ".tar", "gz", ".ar", ".iso", ".xz"],
  documents: [
    ".docx",
    ".doc",
    ".pdf",
    ".xlsx",
    ".xls",
    ".odt",
    ".ods",
    ".odp",
    ".odg",
    ".odf",
    ".txt",
    ".ps",
    ".tex",
  ],
  app: [".exe", ".dmg", ".pkg", ".deb"],
};

switch (command) {
  case "tree":
    treeFn(inputArr[1]);
    break;
  case "organize":
    organizeFn(inputArr[1]);
    break;
  case "help":
    helpFn();
    break;
  default:
    console.log("please input a valid command");
}

function helpFn() {
  console.log(`
list of all commands:
- node main.js tree 'directoryPath'
- node main.js organize 'direcotryPath'
- node main.js help`);
}

function organizeFn(srcDir) {
  let pathExists = fs.existsSync(srcDir);
  let isDir = !path.extname(path.basename(srcDir));

  if (srcDir && pathExists && isDir) {
    organizedDir = path.join(srcDir, "organized");
    if (!fs.existsSync(organizedDir)) fs.mkdirSync(organizedDir);

    let srcDirContent = fs.readdirSync(srcDir);
    let category;
    let filePath;
    let categoryPath;

    srcDirContent.forEach((content) => {
      if (fs.lstatSync(path.join(srcDir, content)).isFile()) {
        category = identifyCategory(content);
        filePath = path.join(srcDir, content);
        categoryPath = path.join(organizedDir, category);
        moveToCategory(filePath, categoryPath);
      }
    });
  } else {
    console.log("enter valid path");
    return;
  }
}

function identifyCategory(file) {
  let fileExtn = path.extname(file);

  for (let category in categories) {
    let extnArr = categories[category];

    for (let i = 0; i < extnArr.length; i++) {
      if (fileExtn === extnArr[i]) {
        return category;
      }
    }
  }
  return "others";
}

function moveToCategory(currfilePath, categoryPath) {
  if (!fs.existsSync(categoryPath)) fs.mkdirSync(categoryPath);

  let destFilePath = path.join(categoryPath, path.basename(currfilePath));
  fs.copyFileSync(currfilePath, destFilePath);
  fs.unlinkSync(currfilePath);
  console.log(`moved ${path.basename(currfilePath)}`);
}

// TODO
function treeFn(dirPath) {}