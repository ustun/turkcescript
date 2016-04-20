var webpack = require("webpack");

module.exports = {

    entry: './main.js',
    output: { filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]

};
