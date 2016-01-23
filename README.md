# TürkçeScript: Türkçe anahtar kelimelerle JavaScript uygulamaları yazın

Bu depo, Türkçe anahtar kelimeler kullanarak JavaScript uygulamaları yazmanızı sağlayan bir Babel eklentisidir.


```js
değişken x = 4;
x = x + 1;
eğer (x === 5) {
    console.log("x 5'e eşit");
} değilse {
    console.log("x 5'e eşit değil");
}
```


# Demo

http://ustun.github.io/turkcescript/ adresinden TürkçeScript'i kullanabilirsiniz.


# Kurulum

```bash
npm install turkcescript
```

```js
var turkcescript = require('turkcescript');
```js
eval(turkcescript(`
    değişken x = 4;
    x = x + 1;
    eğer (x === 5) {
        console.log("x 5'e eşit");
    } değilse {
        console.log("x 5'e eşit değil");
    }
`))
```


# Ayrıntılar

Şu an için desteklenen anahtar kelimeler şu şekilde:

```
if yerine eğer
else yerine değilse
for yerine tekrarla
function yerine fonksiyon
return yerine döndür

Dizilerdeki metodlar:

map yerine dönüştür
filter yerine filtrele
reduce yerine indirge
forEach yerine herbiriIcin (Not: Şu an için bir bugdan ötürü İ değil I, ç değil ç)
```
