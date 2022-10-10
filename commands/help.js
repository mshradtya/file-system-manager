function helpFn() {
  console.log(`
list of all commands:
- node main.js tree 'directoryPath'
- node main.js organize 'direcotryPath'
- node main.js help`);
}

module.exports = {
    helpKey: helpFn
}