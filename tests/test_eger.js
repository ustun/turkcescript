var test = require('tape');


var transform = function (x) {
    // TODO: call the babel transformer
    return x;
}

test('sadece eger kelimesi', function (t) {
    var input = `
eğer (x === 4) {
   console.log("x dorttur");
}`;
    var output = `if (x === 4) {
   console.log("x dorttur");
}`
    t.assert(transform(input) === output);
    t.end();
});


test('sadece eger ve degilse kelimeleri', function (t) {
    var input = `
eğer (x === 4) {
   console.log("x dorttur");
} değilse {
   console.log("x dort degildir");
}`;
    var output = `if (x === 4) {
   console.log("x dorttur");
} else {
   console.log("x dort degildir");
}`
    t.assert(transform(input) === output);
    t.end();
});

test('eger, degilse ve degilse kisminda tekrar eger', function (t) {
    var input = `
eğer (x === 4) {
   console.log("x dorttur");
} değilse eğer (x === 3) {
   console.log("x üçtür");
} değilse {
   console.log("x dört ya da üç değildir");
}`;
    var output = `
if (x === 4) {
   console.log("x dorttur");
} else if (x === 3) {
   console.log("x üçtür");
} else {
   console.log("x dört ya da üç değildir");
}`
    t.assert(transform(input) === output);
    t.end();
});
