const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        contentScript: './src/contentScript.js',
        background: './src/background.js',
        popup: './dist/popup.js',
        popup2: './dist/popup2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: false, 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
