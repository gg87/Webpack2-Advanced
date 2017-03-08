const path = require('path');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

const config = {
    entry: {
        vendor: ['babel-polyfill'],
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/' // for webpack-dev-server output
    },
    module: {
        rules: [
            { 
                test: /\.hbs$/, 
                loader: 'handlebars-loader'
            },
            { 
                test: /\.(js|jsx)$/,
                use: [ 
                    {   
                        loader: 'babel-loader',
                        options: {
                            plugins: ['transform-runtime'],
                            presets: ['es2015']
                        }  
                    },
                    { loader: 'eslint-loader'}
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.(css|scss)$/, 
                loader: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader?importLoaders=1'}, // translates CSS into CommonJS
                        { loader: 'postcss-loader'}, // postprocesses CSS
                        { loader: 'resolve-url-loader'}, // resolves relative paths based on the original source file.
                        { loader: 'sass-loader?sourceMap'} // compiles Sass to CSS
                    ]
                })
            }
        ]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            Components: path.resolve(__dirname, 'src/components')
        }
    },
    devtool: "eval",
    devServer: {
        contentBase: path.join(__dirname, "src"), //dev
        compress: true,
        port: 8000
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        }),
        new ExtractTextPlugin({
            filename:'bundle.css',
            disable:false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: 'src/images' , to: 'images'},
            { from: 'src/fonts' , to: 'fonts'}
        ]),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'src/index.html'
        })
    ]
};

module.exports = config;
