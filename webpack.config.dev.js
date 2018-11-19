const path = require('path');
const mainJs = path.resolve(__dirname, 'src/index.js');
const outputPath = path.resolve(__dirname, 'public/dist');


module.exports = {
    entry: {
        app: mainJs
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [{
            test: /\.js$/, // include .js files
            enforce: "pre", // preload the jshint loader
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            use: [{
                loader: "babel-loader",
            }]
        }]
    },
};