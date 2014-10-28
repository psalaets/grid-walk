var Vec2 = require('vec2');

/**
* Create a grid walker.
*
* @param {number} cellWidth - Width of cells in grid
* @param {number} cellHeight - Height of cells in grid
*/
function Walker(cellWidth, cellHeight) {
  this.cellWidth = cellWidth;
  this.cellHeight = cellHeight;
}

/**
* Walk along a line through the grid.
*
* @param {object} start - Start point of line, object with x/y properties.
* @param {object} end - End point of line, object with x/y properties.
* @param {function} fn - Callback to be invoked *synchronously* for each cell
*                        visited with grid coordinate
*                        {column: number, row: number} as the lone param.
*/
function walk(start, end, fn) {
  this.start = new Vec2(start);
  this.end = new Vec2(end);
  this.direction = calcDirection(this.start, this.end);

  // positive deltas go right and down
  this.cellStepDelta = {
    horizontal: 0,
    vertical: 0
  }

  this.tMax = new Vec2();
  this.tDelta = new Vec2();

  this.currentCoord = positionToCoordinate(this.start, this.cellWidth, this.cellHeight);
  this.endCoord = positionToCoordinate(this.end, this.cellWidth, this.cellHeight);

  this.initStepMath();

  while (!this.isPastEnd()) {
    fn(this.currentCoord);

    if (this.shouldMoveHorizontally()) {
      this.moveHorizontally();
    } else {
      this.moveVertically();
    }
  }
}

function shouldMoveHorizontally() {
  return this.tMax.x < this.tMax.y;
}

function moveHorizontally() {
  this.tMax.x += this.tDelta.x;
  this.currentCoord = {
    column: this.currentCoord.column + this.cellStepDelta.horizontal,
    row: this.currentCoord.row
  };
}

function moveVertically() {
  this.tMax.y += this.tDelta.y;
  this.currentCoord = {
    column: this.currentCoord.column,
    row: this.currentCoord.row + this.cellStepDelta.vertical
  };
}

function isPastEnd() {
  if (this.cellStepDelta.horizontal > 0) { // going right
    if (this.currentCoord.column >= this.endCoord.column + this.cellStepDelta.horizontal) {
      return true;
    }
  } else if (this.cellStepDelta.horizontal < 0) { // going left
    if (this.currentCoord.column <= this.endCoord.column + this.cellStepDelta.horizontal) {
      return true;
    }
  }

  if (this.cellStepDelta.vertical > 0) { // going down
    if (this.currentCoord.row >= this.endCoord.row + this.cellStepDelta.vertical) {
      return true;
    }
  } else { // going up
    if (this.currentCoord.row <= this.endCoord.row + this.cellStepDelta.vertical) {
      return true;
    }
  }

  return false;
}

function initStepMath() {
  var cellBound = new Vec2();

  if (this.direction.x > 0) {
    this.cellStepDelta.horizontal = 1;
    cellBound.x = (this.currentCoord.column + 1) * this.cellWidth;
  } else {
    this.cellStepDelta.horizontal = -1;
    cellBound.x = this.currentCoord.column * this.cellWidth;
  }

  if (this.direction.y > 0) {
    this.cellStepDelta.vertical = 1;
    cellBound.y = (this.currentCoord.row + 1) * this.cellHeight;
  } else {
    this.cellStepDelta.vertical = -1;
    cellBound.y = this.currentCoord.row * this.cellHeight;
  }

  var rxr = 0;
  if (this.direction.x) {
    rxr = 1 / this.direction.x;
    this.tMax.x = (cellBound.x - this.start.x) * rxr;
    this.tDelta.x = this.cellWidth * this.cellStepDelta.horizontal * rxr;
  } else {
    this.tMax.x = Number.MAX_VALUE;
  }

  var ryr = 0;
  if (this.direction.y) {
    ryr = 1 / this.direction.y;
    this.tMax.y = (cellBound.y - this.start.y) * ryr;
    this.tDelta.y = this.cellHeight * this.cellStepDelta.vertical * ryr;
  } else {
    this.tMax.y = Number.MAX_VALUE;
  }
}

function positionToCoordinate(position, cellWidth, cellHeight) {
  return {
    column: spaceToGridUnits(position.x, cellWidth),
    row: spaceToGridUnits(position.y, cellHeight)
  };
}

/**
* Convert position to grid coordinate along one axis.
*
* @param {number} spacePosition
* @param {number} cellSize
* @return {number} coordinate of cell that spacePosition is in
*/
function spaceToGridUnits(spacePosition, cellSize) {
  return Math.floor(spacePosition / cellSize);
}

/**
* Figure out direction vector of line connecting two points.
*
* @param {Vec2} start
* @param {Vec2} end
* @return {Vec2} normalized direction vector
*/
function calcDirection(start, end) {
  var direction = new Vec2(end);
  direction.subtract(start);
  direction.normalize();
  return direction;
}

Walker.prototype = {
  walk: walk,
  initStepMath: initStepMath,
  isPastEnd: isPastEnd,
  shouldMoveHorizontally: shouldMoveHorizontally,
  moveHorizontally: moveHorizontally,
  moveVertically: moveVertically
};

module.exports = Walker;
