var Walker = require('./lib/walker');

function createWalker(cellWidth, cellHeight) {
  return new Walker(cellWidth, cellHeight);
}

module.exports = createWalker;
