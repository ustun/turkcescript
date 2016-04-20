var test = require('tape');


var transform = require('../index');

test('yazdir kelimesi', function (t) {
    var input = `yazdır('turkce');`
    var output = `console.log('turkce');`
console.log(transform(input), "aaa")
    t.assert(transform(input).trim() === output.trim());
    t.end()
});
