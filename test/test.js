var assert = require('chai').assert;
var gw = require('../');

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

    assert.deepEqual(collector.coords, [c(2, 2)]);
  });

  it('finds both cells when right-facing line crosses horizontally adjacent cells', function() {
    var start = p(1, 11);
    var end = p(22, 12);

    walker.walk(start, end, collector);

    assert.deepEqual(collector.coords, [
      c(1, 2),
      c(2, 2)
    ]);
  });

  it('finds both cells when left-facing line crosses horizontally adjacent cells', function() {
    var start = p(22, 11);
    var end = p(1, 12);

    walker.walk(start, end, collector);

    assert.deepEqual(collector.coords, [
      c(2, 2),
      c(1, 2)
    ]);
  });

  it('finds both cells when down-facing line cross vertically adjacent cells', function() {
    var start = p(1, 1);
    var end = p(1, 12);

    walker.walk(start, end, collector);

    assert.deepEqual(collector.coords, [
      c(1, 1),
      c(1, 2)
    ]);
  });

  it('finds both cells when up-facing line cross vertically adjacent cells', function() {
    var start = p(1, 11);
    var end = p(1, 1);

    walker.walk(start, end, collector);

    assert.deepEqual(collector.coords, [
      c(1, 2),
      c(1, 1)
    ]);
  });
});

// point in space
function p(x, y) {
  return {
    x: x || 0,
    y: y || 0
  };
}

// coordinate in grid
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
