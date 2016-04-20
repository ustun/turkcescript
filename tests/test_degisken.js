var test = require('tape');


var transform = require('../index');

test('degisken kelimesi', function (t) {
    var input = `değişken x = 4;`
    var output = `let x = 4;`
console.log(transform(input), "aaa")
    t.assert(transform(input) === output);
    t.end()
});
