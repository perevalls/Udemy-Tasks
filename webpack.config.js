
const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MinicssExtractPlugin    = require('mini-css-extract-plugin');

// et permet moure fitxers
const CopyPlugin              = require("copy-webpack-plugin");
 
module.exports = {
 
    mode: 'development',
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false
                },
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MinicssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }                   
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MinicssExtractPlugin({
            filename: 'styles.css', // [fullHash] et permet que els navegadors no mantinguin en caché el fitxer
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/assets/", to: "assets/"}
                
            ]
        })
    ]    
}