var test = require('tape');


var transform = require('../index');


test('sabit kelimesi', function (t) {
	
    var input = `sabit x = 4;`;
    var output = `const x = 4;`;
	
	console.log(transform(input), "aaa");
	
    t.assert(transform(input) === output);
    t.end();
});