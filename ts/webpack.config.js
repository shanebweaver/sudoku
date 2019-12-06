var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(ts|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'SAML to Graph Bridge'
        })
    ]
};