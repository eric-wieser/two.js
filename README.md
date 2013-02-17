two.js
======

A javascript geometry library providing classes for Vectors, Matrices, and Transformations

Vectors
-------

Vectors have two components

```javascript
var v = new Vector(3, 4);
console.log(v.x + ', ' + v.y); // 3, 4
console.log(v.magnitude());    // 5

v = v.times(2);

var w = Vector.fromPolarCoords(8, Math.PI);

console.log('Angle between ' + w + ' and ' + v + ' is ' + w.angleTo(v) + ' radians');
```

Matrices
--------

A 2x2 square Matrix class

```javascript
var m = Matrix.fromRotation(Math.PI/4);
var n = Matrix.fromRotation(Math.PI/2);

console.log(m.times(v)); //v, rotated by 45 degrees
console.log(m.times(n).times(v)); //v, rotated by 135 degrees
console.log(m.times(n.times(v))); //Matrix muliplication is associative, so this will always be the same as the previous line
```
