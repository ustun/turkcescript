import * as babylon from "babylon";
// var babylon = require('babylon');
const code = `function square(n) {
  return n * n;
}`;

function pp(x) {
    return JSON.stringify(x, null, 2);
};

// console.log(JSON.stringify(babylon.parse(code), null, 4));


var types = require('babel-types');

console.log(pp(types));
