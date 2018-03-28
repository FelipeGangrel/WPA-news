const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: process.env.NODE_ENV === "development"
});

const htmlPlugin =  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    hash: false,
    publicPath: '/',
});

const rules = {
    scss: {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: extractSass.extract({
            use: [
                {   // traduz css para CommonJS
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        minimize: true,
                    }
                },
                {   // Compila SASS para CSS
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        minify: true,
                    }
                },
            ],
            fallback: 'style-loader' // usar style loader em desenvolvimento
        })
    },
};

module.exports = {
    mode: "development",
    entry: {
        app: [
            './src/app.js',
            './src/style.scss',
        ],
        sw: [
            './src/sw.js',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            rules.scss
        ]
    },
    plugins: [
        extractSass,
        htmlPlugin,
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true, // usando gzip
        port: 8080,
    },
}