const modifications = [
    {source: /e\u011Fer/g, target: 'if'},
    {source: /de\u011Filse/g, target: 'else'},
    {source: /\bde\u011Fi\u015Fken\b/g, target: 'var'},
    {source: /\btekrarla\b/g, target: 'for'},
    {source: /\bfonksiyon\b/g, target: 'function'},
    {source: /\bdönü\u015Ftür\b/g, target: 'map'},
    {source: /\bdöndür\b/g, target: 'return'},
	{source: /\bsabit\b/g, target: 'const'},
	{source: /\bglobalDe\u011Fi\u015Fken\b/g ,target: 'let'},
	{source: /yazd\u0131r/g, target: 'console.log'},
	{source: /\bherbiri\u0130\u00E7in\b/g, target: 'forEach'},
	{source: /\bb\u00FCy\u00FCkHarfeD\u00F6n\u00FC\u015Ft\u00FCr\b/g, target: 'toUpperCase'},
	{source: /\bk\u00FC\u00E7\u00FCkHarfeD\u00F6n\u00FC\u015Ft\u00FCr\b/g, target: 'toLowerCase'},
	{source: /\bfiltrele\b/g, target: 'filter'},
	{source: /\bindirge\b/g, target: 'reduce'}
];

const transform = function (text) {

    modifications.forEach(function (modification) {
        text = text.replace(modification.source, modification.target);
    })

    return text;
};


Array.prototype.dönüştür = Array.prototype.map;
Array.prototype.filtrele = Array.prototype.filter;
Array.prototype.indirge = Array.prototype.reduce;
Array.prototype.herbiriİçin = Array.prototype.forEach;


String.prototype.büyükHarfeDönüştür = String.prototype.toUpperCase;
String.prototype.küçükHarfeDönüştür = String.prototype.toLowerCase;


module.exports = transform;
