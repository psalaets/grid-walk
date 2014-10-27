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

  describe('walking horizontal line', function() {
    it('finds cells touched by right-facing line', function() {
      var start = p(1, 11);
      var end = p(22, 12);

      walker.walk(start, end, collector);

      assert.deepEqual(collector.coords, [
        c(1, 2),
        c(2, 2)
      ]);
    });

    it('finds cells touched by left-facing line', function() {
      var start = p(22, 11);
      var end = p(1, 12);

      walker.walk(start, end, collector);

      assert.deepEqual(collector.coords, [
        c(2, 2),
        c(1, 2)
      ]);
    });

    it('finds lower cell when line runs along cell boundary', function() {
      var start = p(22, 10);
      var end = p(25, 10);

      walker.walk(start, end, collector);

      assert.deepEqual(collector.coords, [
        c(2, 2)
      ]);
    });
  });

  describe('walking veritcal line', function () {
    it('finds cells touched by down-facing line', function() {
      var start = p(1, 1);
      var end = p(1, 12);

      walker.walk(start, end, collector);

      assert.deepEqual(collector.coords, [
        c(1, 1),
        c(1, 2)
      ]);
    });

    it('finds cells touched by up-facing line', function() {
      var start = p(1, 11);
      var end = p(1, 1);

      walker.walk(start, end, collector);

      assert.deepEqual(collector.coords, [
        c(1, 2),
        c(1, 1)
      ]);
    });

    it('finds right-hand cell when line runs along cell boundary', function() {
      var start = p(20, 1);
      var end = p(20, 9);

      walker.walk(start, end, collector);

      assert.deepEqual(collector.coords, [
        c(2, 1)
      ]);
    });
  });

  describe('walking diagonal line', function () {
    describe('crossing above center of cell quad', function () {
      it('finds 3 upper/right cells of quad', function() {
        var start = p(15, 3);
        var end = p(30, 12);

        walker.walk(start, end, collector);

        assert.deepEqual(collector.coords, [
          c(1, 1),
          c(2, 1),
          c(2, 2)
        ]);
      });
    });

    describe('crossing below center of cell quad', function () {
      it('finds 3 lower/left cells of quad', function () {
        var start = p(22, 15);
        var end = p(10, 7);

        walker.walk(start, end, collector);

        assert.deepEqual(collector.coords, [
          c(2, 2),
          c(1, 2),
          c(1, 1)
        ]);
      });
    });

    describe('crossing through center of cell quad', function () {
      it('finds 3 lower/left cells of quad for SE-facing line');
      it('finds 3 top/right cells of quad for NW-facing line');
      it('finds 3 lower/right cells of quad for SW-facing line');
      it('finds 3 top/left cells of quad for NE-facing line');
    });
  });
});

// point in space
function p(x, y) {
  return {
    x: x,
    y: y
  };
}

// coordinate in grid
function c(column, row) {
  return {
    column: column,
    row: row
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
