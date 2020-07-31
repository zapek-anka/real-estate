const path = require('path');
const cssExtract = require('mini-css-extract-plugin');

module.exports = {
    mode: 'none',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            },
            {
                test: /\.less$/,
                use: [
                    cssExtract.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new cssExtract({
            filename: 'style.css'
        })
    ]
};
