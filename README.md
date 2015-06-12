# grid-walk

Walk along line through 2D grid.

## Usage

```js
var gw = require('grid-walk');
var walker = gw(cellWidth, cellHeight);

var lineStart = {x: 10, y: 50};
var lineEnd = {x: 0, y: 20};

walker.walk(lineStart, lineEnd, function(coord) {
  coord.column
  coord.row
});
```

Column numbers start at 0 and increase going right.

Row number start at 0 and increase going down.

## Install

    npm install grid-walk

## License

MIT

## Thanks

Code and algorithm came from

- [http://www.cs.yorku.ca/%7Eamana/research/grid.pdf](http://www.cs.yorku.ca/%7Eamana/research/grid.pdf)
- [http://www.flipcode.com/archives/Raytracing_Topics_Techniques-Part_4_Spatial_Subdivisions.shtml](http://www.flipcode.com/archives/Raytracing_Topics_Techniques-Part_4_Spatial_Subdivisions.shtml)
