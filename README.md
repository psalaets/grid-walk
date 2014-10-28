# grid-walk

Walk along line through 2D grid.

Code and algorithm came from

- [http://www.cs.yorku.ca/%7Eamana/research/grid.pdf]()
- [http://www.flipcode.com/archives/Raytracing_Topics_Techniques-Part_4_Spatial_Subdivisions.shtml]()

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
