var webpack = require('webpack');
var path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

var parentDir = path.join(__dirname, './');

module.exports = {
    mode: 'development',
    entry: [
        path.join(parentDir, 'index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /node\_modules/,
                loader: 'babel-loader'
            },{
                test: /\.css$/,
                loaders: ["style-loader", "css-loder"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true,
        port: 4001,
        hot: true
    },
    plugins: [
        new WebpackAssetsManifest({
          // Options go here
          fileName: 'asset-manifest.json',
          publicPath: 'dist',
        }),
    ]
}