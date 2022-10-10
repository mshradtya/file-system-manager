const fs = require("fs");
const path = require("path");

function treeFn(inputPath, indent) {
  if (!inputPath) {
    treeFn(process.cwd(), "");
  } else {
    let pathExists = fs.existsSync(inputPath);

    if (pathExists) {
      let isFile = fs.lstatSync(inputPath).isFile();
      if (isFile) {
        let fileName = path.basename(inputPath);
        console.log(indent + "├──" + fileName);
      } else {
        let dirName = path.basename(inputPath);
        console.log(indent + "└──" + dirName);
        let dirContent = fs.readdirSync(inputPath);
        dirContent.forEach((content) => {
          let contentPath = path.join(inputPath, content);
          treeFn(contentPath, "│   " + indent);
        });
      }
    } else {
      console.log("enter valid path");
    }
  }
}

module.exports = {
  treeKey: treeFn,
};
