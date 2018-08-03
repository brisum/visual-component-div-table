'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Plugin
const extractTextPluginCss = new ExtractTextPlugin({
    filename: '[name].css?[contenthash]',
    allChunks: true
});

module.exports = {
    context: __dirname,

    entry: {
        'div-table': './src/scss/div-table.scss'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
        filename: '[name].js?[chunkhash]',
        chunkFilename: 'js/chunk/[name].[id].js?[chunkhash]',
        library: '[name]'
    },

    devtool: NODE_ENV === 'development' ? "source-map" : false,

    watchOptions: {
        aggregateTimeout: 300
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["es2015"] }
                }
            },
            {
                test: /\.css$/,
                use: extractTextPluginCss.extract(['css-loader', 'resolve-url-loader'])
            },
            {
                test: /\.scss$/,
                use: extractTextPluginCss.extract(['css-loader?sourceMap', 'resolve-url-loader?sourceMap', 'sass-loader?sourceMap'])
            },
            {
                test: /\.(gif|png|jpg|svg|ttf|eot|woff|woff2)(\?\S*)?/,
                use: {
                    loader: 'file-loader',
                    options: {
                        filename: '[path][name].[ext]?[hash:6]'
                    }
                }
            }
        ]
    },

    plugins: [
        extractTextPluginCss,
    ]
};


// NODE_ENV=development webpack --watch
// NODE_ENV=production webpack --optimize-minimize