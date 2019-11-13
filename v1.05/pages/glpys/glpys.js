// complex methods
// 构造函数，默认为 0
let complex = (x, y) => { return { x: x || 0, y: y || 0 }; };
// 从弧度构造单位复数
 complex.fromAngle = (angle) => complex(Math.cos(angle), Math.sin(angle));
// 复数加复数
complex.add = (a, b) => complex(a.x + b.x, a.y + b.y);
// 复数乘复数
complex.mul = (a, b) => complex(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
// 数乘复数
complex.numMul = (n, c) => complex(n * c.x, n * c.y);
// 复数减复数
complex.minus = (a, b) => complex(a.x - b.x, a.y - b.y);

// array restructuring
let flatten = (matrix) => matrix.reduce((pre, cur) => pre.concat(cur), []);
let partition = (array, n) => array.reduce((pre, cur, i) => (pre[i % n] = pre[i % n] || []).push(cur) && pre, []);
let transpose = (matrix) => partition(flatten(matrix), matrix[0].length);
//DFT
let recursiveDFT = (a, inverse) => a.length == 1 ? a : flatten(transpose(transpose(a.reduce((pre, cur, i) => pre[i & 1].push(cur) && pre, [[], []]).map(v => recursiveDFT(v))).map((v, i) => [complex.add(v[0], complex.mul(complex.fromAngle(i * (inverse ? -2 * Math.PI / a.length : 2 * Math.PI / a.length)), v[1])), complex.minus(v[0], complex.mul(complex.fromAngle(i * (inverse ? -2 * Math.PI / a.length : 2 * Math.PI / a.length)), v[1]))]))).map(v => inverse ? complex.numMul(1 / a.length, v) : v);
//test
var x = [complex(1), complex(2), complex(0), complex(0)]; // 1 + 2x
//console.log(x);
var y = [complex(3), complex(4), complex(0), complex(0)]; // 3 + 4x
//console.log(y);
var rx = recursiveDFT(x);
var rrx = recursiveDFT(rx, true); // almost same as x
//console.log(rrx);
var ry = recursiveDFT(y);
var ryy = recursiveDFT(ry, true); // almost same as y
//console.log(ry);
var rc = rx.map((v, i) => complex.mul(v, ry[i]));
var rcc = recursiveDFT(rc, true);
//console.log(rcc); // almost same as [complex(3), complex
//计算PSD
let glpjs=(x,y,z)=>{return{z:(x*x+y*y)/256}}  
//console.log(10*Math.log10(glpjs(rx[1].x,rx[1].y,2)))
