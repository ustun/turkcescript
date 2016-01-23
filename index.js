const modifications = [
    {source: /e\u011Fer/g, target: 'if'},
    {source: /de\u011Filse/g, target: 'else'},
    {source: /\bde\u011Fi\u015Fken\b/g, target: 'var'},
];

const transform = function (text) {

    modifications.forEach(function (modification) {
        text = text.replace(modification.source, modification.target);
    })

    return text;
};


module.exports = transform;
