const path = require('path');

module.exports = {
    mode: 'development', // Set the mode to 'development' or 'production'
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
    devtool: false, // Disable source maps to avoid using eval
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