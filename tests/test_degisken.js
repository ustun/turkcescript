var test = require('tape');


var transform = function (x) {
    // TODO: call the babel transformer
    return x;
}

test('degisken kelimesi', function (t) {
    var input = `değişken x = 4;`
    var output = `var x = 4;`
    t.assert(transform(input) === output);
    t.end()
});
