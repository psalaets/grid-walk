var assert = require('chai').assert;
var gw = require('../');

// point
function p(x, y) {
  return {
    x: x || 0,
    y: y || 0
  };
}

// coordinate
function c(column, row) {
  return {
    column: column || 0,
    row: row || 0
  };
}

function createCollector() {
  var coords = [];

  function collector(coord) {
    coords.push(coord)
  }

  collector.coords = coords;
  return collector;
}

describe('walker#walk', function() {
  var walker, collector;

  beforeEach(function() {
    var cellWidth = 20;
    var cellHeight = 10;

    walker = gw(cellWidth, cellHeight);
    collector = createCollector();
  });

  it('finds single cell when line is in one cell', function() {
    var start = p(21, 11);
    var end = p(22, 12);

    walker.walk(start, end, collector);

    assert.deepEqual(collector.coords, [c(1, 1)]);
  });
});
