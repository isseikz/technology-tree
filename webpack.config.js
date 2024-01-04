const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        library: 'TechTree',
        libraryTarget: 'window'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: [path.resolve(__dirname, 'dist'), /node_modules/]
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        static: [
            {directory: path.join(__dirname, 'demo')},
            {directory: path.join(__dirname, 'dist')}
        ],
        port: 3000,
        hot: true,
        client: {
            logging: 'verbose'
        }
    },
};
