# grid-walk

Walk along line through 2D grid.

## Usage

    var gw = require('grid-walk')

    var walker = gw(cellWidth, cellHeight)
    walker.walk(lineStart, lineEnd, function(coord) {
      // do something with coord
    })

## Install

    npm install grid-walk

## License

MIT
