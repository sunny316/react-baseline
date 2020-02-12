var webpack = require('webpack');
var path = require('path');
const WebpackAssetsManifest = require('webpack-manifest-plugin');

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
        port: 4002,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    plugins: [
        new WebpackAssetsManifest({
          // Options go here
          fileName: 'asset-manifest.json',
          generate: (seed, files, entrypoints) => {
            const manifestFiles = files.reduce((manifest, file) => {
              manifest[file.name] = file.path;
              return manifest;
            }, seed);
            const entrypointFiles = entrypoints.main.filter(
              fileName => !fileName.endsWith('.map')
            );
  
            return {
              files: manifestFiles,
              entrypoints: entrypointFiles,
            };
          },
        }),
    ]
}