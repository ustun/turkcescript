const modifications = [
    {source: /e\u011Fer/g, target: 'if'},
    {source: /de\u011Filse/g, target: 'else'},
    {source: /\bde\u011Fi\u015Fken\b/g, target: 'var'},
    {source: /\btekrarla\b/g, target: 'for'},
    {source: /\bfonksiyon\b/g, target: 'function'},
    {source: /\bdönü\u015Ftür\b/g, target: 'donustur'},
    {source: /\bdöndür\b/g, target: 'return'},
    {source: /\bherbiriIcin\b/g, target: 'forEach'}



];

const transform = function (text) {

    modifications.forEach(function (modification) {
        text = text.replace(modification.source, modification.target);
    })

    return text;
};

Array.prototype.donustur = Array.prototype.map;
Array.prototype.filtrele = Array.prototype.filter;
Array.prototype.indirge = Array.prototype.reduce;
Array.prototype.herbiriİçin = Array.prototype.forEach;




module.exports = transform;
