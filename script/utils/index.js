const path = require('path');
const clc = require('cli-color');
const fs = require('fs');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const current = `${path}/${file}`;
      if (fs.statSync(current).isDirectory()) {
        deleteFolderRecursive(current);
      } else {
        fs.unlinkSync(current);
      }
    });
    fs.rmdirSync(path);
  }
}

module.exports = {
  log(message, type = 'notice') {
    const colorMap = {
      error: clc.red.bold,
      warn: clc.yellow,
      notice: clc.blue,
      success: clc.green,
    };
    console.log(colorMap[type](`TDesign: ${message}`));
  },
  resolveCwd(...args) {
    args.unshift(process.cwd());
    return path.join(...args);
  },
  deleteFolderRecursive,
};